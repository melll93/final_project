import React, { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { insertCarpoolDB } from "../../../axios/board/carpool/CarpoolLogic";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { ContainerDiv, FormDiv } from "../../../styles/formStyle";
import LandingPage from "./Map/LandingPage";
import { Cookies } from "react-cookie";

const CarpoolWriteForm = ({ carpool }) => {
  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData);
  //props를 넘어온 값 즉시 구조분해 할당하기

  const navigate = useNavigate();
  const [title, setTitle] = useState(""); //제목
  //mem_id를 받아오자
  //const[writer, setWriter]= useState(''); //작성자
  const [date, setDate] = useState(""); //날짜
  const [content, setContent] = useState(""); //내용작성
  const [types] = useState(["일반", "결제", "양도", "회원", "수업"]); //qna_type의 라벨값

  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  }, []);

  const handleTitle = useCallback((e) => {
    setTitle(e);
  }, []);

  // mem_id 받아온 후
  // const handleWriter = useCallback((e) => {
  //   setWriter(e);
  // },[]);

  const handleDate = useCallback((e) => {
    setDate(e);
  }, []);
  const handleWriter = useCallback((e) => {}, []);

  const insertCarpool = async () => {
    if (!title) {
      Swal.fire({
        title: "제목을 입력해주세요",
        icon: "warning",
      });
      return;
    }
    if (!date) {
      Swal.fire({
        title: "날짜를 입력해주세요",
        icon: "warning",
      });
      return;
    }
    if (!content) {
      Swal.fire({
        title: "내용을 입력해주세요",
        icon: "warning",
      });
      return;
    }
    console.log("insertCarpool");
    const carpool = {
      boardCpTitle: title, // 제목 추가
      boardCpContent: content, // 내용 추가
      boardCpMemId: _userData.memberId,
      boardCpDate: date,
    };
    console.log(carpool);
    try {
      const res = await insertCarpoolDB(carpool);
      console.log("insertCarpoolDB : ", res.data);
      window.location.replace("/carpool");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <ContainerDiv>
        <div style={{ height: "100px" }}></div>
        <FormDiv>
          <h3>Carpool 글작성 하기</h3>
          <br />
          <div style={{ width: "100%", maxWidth: "2000px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <h2>제목</h2>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "10px",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                ></div>
                <Button
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    insertCarpool();
                  }}
                >
                  글쓰기
                </Button>
                <Button
                  onClick={() => {
                    if (window.confirm("정말로 뒤로 가시겠습니까?")) {
                      window.history.back();
                    }
                  }}
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                >
                  뒤로가기
                </Button>
                <Button
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    if (window.confirm("정말 목록으로 가시겠습니까?")) {
                      navigate("/carpool");
                    }
                  }}
                >
                  목록으로
                </Button>
              </div>
            </div>

            <input
              id="carpool_title"
              type="text"
              maxLength="50"
              placeholder="제목을 입력하세요."
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid lightGray",
              }}
              onChange={(e) => {
                handleTitle(e.target.value);
              }}
            />

            {/* <h3>작성자</h3>
            <span
              id="board_writer"
              type="text"
              maxLength="50"
              value={_userData.memberId}
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid lightGray",
              }}
              // onChange={(e) => {
              //   handleWriter(e.target.value);
              // }}
              {..._userData.memberId}
            /> */}
            <h3>작성자</h3>
            <span
              id="board_writer"
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid lightGray",
              }}
            >
              {_userData.memberId}
            </span>
            <hr style={{ margin: "10px 0px 10px 0px" }} />

            <h3>날짜</h3>
            <input
              style={{ width: "100%" }}
              type="date"
              className="form-control"
              id="festStartday"
              name="startDay"
              onChange={(e) => {
                handleDate(e.target.value);
              }}
            />

            <hr style={{ margin: "10px 0px 10px 0px" }} />
            <h3>상세내용</h3>
            <input
              style={{
                width: "98%",
                margin: "10px",
                height: "300px",
                fontSize: "20px",
              }}
              value={content}
              handleContent={handleContent}
              type="html"
              name="carpoolContent"
              required
              rows="10"
              className="form-control"
              id="exampleTextarea"
              onChange={(e) => {
                handleContent(e.target.value);
              }}
            ></input>

            <div
              style={{
                border: "1px solid lightGray",
                borderRadius: "10px",
                width: "auto",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            ></div>
            <br />
          </div>
          {<LandingPage />}
          <br />
        </FormDiv>
      </ContainerDiv>
      <Footer />
    </>
  );
};

export default CarpoolWriteForm;
