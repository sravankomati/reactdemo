import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import CanvasJSReact from "../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const options = {
  animationEnabled: true,
  //   exportEnabled: true,
  theme: "light", // "light1", "dark1", "dark2"
  title: {
    text: "Student Report",
  },
  data: [
    {
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: [
        // { y: 20, label: "Airfare" },
        // { y: 24, label: "Food & Drinks" },
        // { y: 20, label: "Accomodation" },
        // { y: 14, label: "Transportation" },
        // { y: 12, label: "Activities" },
        // { y: 10, label: "Misc" },
      ],
    },
  ],
};
export default function Dashboard() {
  const [data, setData] = useState({});
  const showHighScore = async () => {
    setData({});
    options.data[0].dataPoints = [];
    const response = await axios.get(
      "http://localhost:4000/api/marks/getWithHighScore",
      {
        headers: {
          Authorization: localStorage.getItem("id"),
        },
      }
    );
    if (response.data.err) {
      toast.error("Something went wrong please login");
      setTimeout(() => {
        window.location = "/login";
      }, 3000);
    } else {
      options.data[0].dataPoints.push(
        { y: response.data.Noofstudents, label: "NoOfStudentGT400" },
        { y: response.data.notFrom, label: "NoOfStudentLT400" }
      );
      setData(options);
    }
  };
  const showHighScoreSub = async () => {
    setData({});
    options.data[0].dataPoints = [];
    console.log(data);
    const response = await axios.get(
      "http://localhost:4000/api/marks/getWithHighmarks",
      {
        headers: {
          Authorization: localStorage.getItem("id"),
        },
      }
    );
    if (response.data.err) {
      toast.error("Something went wrong please login");
      setTimeout(() => {
        window.location = "/login";
      }, 3000);
    } else {
      options.data[0].dataPoints.push(
        { y: response.data.Eqto90, label: "Marks equal to 90" },
        { y: response.data.notEqTo90, label: "Marks not equal to 90" }
      );
      setData(options);
      //   console.log(data);
    }
  };
  const showMarksBtw = async () => {
    setData({});
    options.data[0].dataPoints = [];
    console.log(data);
    const response = await axios.get(
      "http://localhost:4000/api/marks/getstudentBtw?minmark=70&maxmark=95",
      {
        headers: {
          Authorization: localStorage.getItem("id"),
        },
      }
    );
    if (response.data.err) {
      toast.error("Something went wrong please login");
      setTimeout(() => {
        window.location = "/login";
      }, 3000);
    } else {
      const response1 = response.data["List of students"];
      response1.forEach((i) => {
        options["data"][0]["dataPoints"].push({
          y: i.Subjects.marks,
          label: i.Student[0].StudentName,
        });
      });
      setData(options);
      //   console.log(data);
    }
  };
  const ShowMyReport = async () => {
    setData({});
    options.data[0].dataPoints = [];
    console.log(data);
    const response = await axios.get(
      "http://localhost:4000/api/marks/geMarks",
      {
        headers: {
          Authorization: localStorage.getItem("id"),
        },
      }
    );
    if (response.data.err) {
      toast.error("Something went wrong please login");
      setTimeout(() => {
        window.location = "/login";
      }, 3000);
    } else {
      const { StudentReportCard } = response.data;
      options.data[0].toolTipContent = `<b>${StudentReportCard[0].student_id.StudentName}</b>:${StudentReportCard[0].satus} `;
      StudentReportCard[0].Subjects.map((i) => {
        options["data"][0]["dataPoints"].push({ y: i.marks, label: i.name });
      });
      setData(options);
      //   console.log(data);
    }
  };
  return (
    <div className='m-3'>
      <Button variant='outline-primary' onClick={showHighScore}>
        Show Students who score high
      </Button>{" "}
      <Button variant='outline-secondary' onClick={showHighScoreSub}>
        Show students high score each subject
      </Button>{" "}
      <Button variant='outline-success' onClick={showMarksBtw}>
        show students who score marks in Maths{" "}
      </Button>{" "}
      <Button variant='outline-warning' onClick={ShowMyReport}>
        Get Your Report
      </Button>{" "}
      <div className='m-4'>
        <CanvasJSChart options={data} />
      </div>
    </div>
  );
}
