import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  CarpoolDetailDB,
  deleteCarpoolDB,
} from "../../../axios/board/carpool/CarpoolLogic";
import {
  selectCarpoolReplyDB,
  insertCarpoolReplyDB,
  deleteCarpoolReplyDB,
  updateCarpoolReplyDB,
} from "../../../axios/board/carpool/CarpoolReplyLogic";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { ContainerDiv, FormDiv } from "../../../styles/formStyle";
import LandingPage from "./Map/LandingPage";
import { Modal } from "react-bootstrap";

const CarpoolDetail = () => {
  const navigate = useNavigate();
  const { boardCpNo } = useParams();
  const [boardReplyCpNo, setBoardReplyCpNo] = useState("");
  const { boardReplyCpMemId, setBoardReplyCpMemId } = useState();
  const [boardReplyCpContent, setBoardReplyCpContent] = useState(""); //기존 댓글
  const [boardReplyCpContent2, setBoardReplyCpContent2] = useState(""); //수정 댓글
  const [boardReplyList, setBoardReplyList] = useState([]);
  const [lgShow, setLgShow] = useState(false);

  const inputModifiedReply = useCallback((e) => {
    console.log("inputModifiedReply : ", e);
    setBoardReplyCpContent2(e);
  }, []);

  useEffect(() => {
    selectBoardReplyList();
  }, []);

  const selectBoardReplyList = async () => {
    const boardReply = {
      boardCpNo: boardCpNo,
    };
    const res = await selectCarpoolReplyDB(boardReply);
    console.log("asdas d", res.data);
    if (res.data && Array.isArray(res.data)) {
      setBoardReplyList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };

  const handleBoardReplyCpNo = useCallback((e) => {
    setBoardReplyCpNo(e);
  }, []);

  const handleBoardReplyCpContent = useCallback((e) => {
    setBoardReplyCpContent(e);
  }, []);

  const [carpool, setCarpool] = useState({
    boardCpNo: 0,
    boardCpMemId: "",
    boardCpTitle: "",
    boardCpContent: "",
    boardCpDate: "",
  });
  useEffect(() => {
    const asyncDB = async () => {
      const res = await CarpoolDetailDB({ boardCpNo });
      console.log(res);
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      setCarpool({
        boardCpNo: jsonDoc.boardCpNo,
        boardCpMemId: jsonDoc.boardCpMemId,
        boardCpTitle: jsonDoc.boardCpTitle,
        boardCpContent: jsonDoc.boardCpContent,
        boardCpDate: jsonDoc.boardCpDate,
      });
      if (res.data) {
        setCarpool(res.data);
      } else {
        console.log("카풀 게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {};
  }, []);

  if (!carpool.boardCpTitle) {
    console.log(carpool.boardCpTitle);
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const deleteCarpool = async () => {
    const carpool = {
      boardCpNo: boardCpNo,
    };
    const res = await deleteCarpoolDB(carpool);
    console.log(res.data);
    alert("게시글 삭제 완료");
    navigate("/carpool");
  };

  const submitComment = async () => {
    console.log("submitComment");
    const boardReply = {
      boardCpNo: boardCpNo,
      boardReplyCpMemId: sessionStorage.getItem("id"),
      boardReplyCpContent: boardReplyCpContent,
    };

    if (!boardReplyCpContent) {
      alert("내용을 입력해주세요.");
      return;
    }
    try {
      const res = await insertCarpoolReplyDB(boardReply);
      // 성공시에 페이지 이동처리하기
      window.location.replace(
        "http://localhost:3333/carpool/carpoolDetail/" + boardCpNo
      );
    } catch (error) {
      console.log(error);
    }
  };

  const click = () => {
    setLgShow(true);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <ContainerDiv>
        <div style={{ height: "100px" }}></div>
        <br />
        <div style={{ width: "98%", margin: "10px" }}>
          <h2>카풀 상세보기</h2>
          <br />
          <div>
            <form method="post">
              <input type="hidden" name="boardCpNo" value="" />
              <div>
                <label>제목</label>
                <span
                  style={{ width: "98%", margin: "10px" }}
                  type="text"
                  name="carpoolTitle"
                  required
                  className="form-control form-control-lg"
                  id="inputLarge"
                >
                  {carpool.boardCpTitle}
                </span>
              </div>

              <div>
                <label>작성자</label>
                <span
                  style={{ width: "98%", margin: "10px" }}
                  type="text"
                  name="carpoolMemId"
                  required
                  className="form-control form-control-lg"
                  id="inputLarge"
                >
                  {carpool.boardCpMemId}
                </span>
              </div>

              <div>
                <label>날짜</label>
                <span
                  style={{ width: "98%", margin: "10px" }}
                  type="text"
                  name="carpoolCpDate"
                  required
                  className="form-control form-control-lg"
                  id="inputLarge"
                >
                  {carpool.boardCpDate}
                </span>
              </div>

              <div>
                <label>내용</label>
                <span
                  style={{
                    width: "98%",
                    margin: "10px",
                    height: "300px",
                    fontSize: "20px",
                  }}
                  type="html"
                  name="carpoolContent"
                  required
                  rows="10"
                  className="form-control"
                  id="exampleTextarea"
                >
                  {carpool.boardCpContent}
                </span>
              </div>

              <div
                style={{
                  border: "1px solid lightGray",
                  borderRadius: "10px",
                  width: "98%",
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <LandingPage />
              </div>
            </form>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ margin: "10px", backgroundColor: "black" }}
              onClick={() => navigate("/carpool")}
            >
              목록으로
            </Button>
            &nbsp;
            <Button
              style={{ margin: "10px", backgroundColor: "black" }}
              onClick={deleteCarpool}
            >
              삭제하자
            </Button>
            {/* <Button style={{ margin: "10px" }} onClick={() =>navigate({
                    pathname: "/together/BoardDetail/"+board.boardTgNo,
                    state:{board}})}> */}
            <Button
              style={{ marginLeft: "10px", backgroundColor: "black" }}
              onClick={() =>
                navigate({
                  pathname: "/carpool/CarpoolUpdate/" + carpool.boardCpNo,
                  state: { carpool },
                })
              }
            >
              수정하자
            </Button>
          </div>

          <label>댓글</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <textarea
              style={{
                width: "98%",
                margin: "10px",
                height: "100px",
                fontSize: "16px",
              }}
              name="boardReplyCpContent"
              onChange={(e) => {
                handleBoardReplyCpContent(e.target.value);
              }}
              required
              rows="3"
              className="form-control"
            />
          </div>

            <Button
              style={{
                marginLeft: "10px",
                backgroundColor: "black",
                textAlign: "center",
              }}
              onClick={submitComment}
            >
              댓글 등록
            </Button>

          <div
            style={{
              width: "1500px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <br />

          <label>댓글리스트</label>
          {boardReplyList.map((boardReply) => (
            <div
              key={boardReply.boardReplCpNo}
              className="product_detail_review_comment"
              style={{
                borderBottom: "1px solid lightgray",
                width: "1100px",
                margin: "50px",
              }}
            >
              회원아이디 : {boardReply.boardReplyCpMemId} 아이디없음{" "}
              <div style={{ fontSize: "8px" }}>
                작성 시간 : ({boardReply.boardReplyCpDate})
              </div>
              <h3>
                <div className="replyContent">
                  <span style={{ color: "red" }}> → </span>
                  <span className="replyContentVal" style={{ color: "black" }}>
                    {boardReply.boardReplyCpContent}
                  </span>
                </div>
              </h3>
              <Button style={{ marginLeft: "10px", backgroundColor: "black" }}>
                <span
                  style={{ fontWeight: "bold" }}
                  onClick={async () => {
                    click();
                    handleBoardReplyCpNo(boardReply.boardReplyCpNo);
                  }}
                >
                  댓글 수정
                </span>
              </Button>
              <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    댓글 수정 detail
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div
                    className="form-floating mb-3"
                    style={{ position: "relative" }}
                  >
                    <div>
                      <input
                        onChange={(e) => {
                          inputModifiedReply(e.target.value);
                        }}
                        className="form-control2"
                        placeholder="수정할 댓글 내용을 입력하세요"
                        id="together_board_detail_reply_textarea"
                        // value={boardReplyTgContent}
                        style={{
                          position: "relative",
                          height: "300px",
                          width: "98%",
                          maxWidth: "1200px",
                        }}
                        maxLength="50"
                      ></input>
                    </div>
                    <br />
                    <br />
                    <button
                      style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        margin: "0px 15px 0px 0px ",
                      }}
                      className="replyBtn"
                      onClick={async () => {
                        const reply = {
                          boardCpNo: boardCpNo,
                          boardReplyCpNo: boardReplyCpNo,
                          boardReplyCpContent: boardReplyCpContent2,
                        };
                        const res = await updateCarpoolReplyDB(reply);
                        console.log("updateTogetherReplyDB : ", res.data);
                        setLgShow(false);
                        console.log(
                          "수정완료" +
                            boardReply.boardReplyCpContent +
                            boardReply.boardReplyCpNo
                        );
                        window.location.reload();
                        console.log("리뷰번호" + boardReply.boardReplyCpNo);
                      }}
                    >
                      Reply Button
                    </button>
                  </div>
                  <br />
                </Modal.Body>
              </Modal>
              <Button
                style={{ marginLeft: "10px", backgroundColor: "black" }}
                onClick={async () => {
                  const reply = {
                    boardCpNo: boardCpNo,
                    boardReplyCpNo: boardReply.boardReplyCpNo,
                  };
                  console.log("너누구야 reply", reply);
                  const res = await deleteCarpoolReplyDB(reply);
                  console.log("deleteCarpoolReplyDB ", res.data);
                  // navigate("/together/BoardDetail/" + board.boardTgNo);
                  window.location.reload();
                  alert("댓글 삭제 완료");
                }}
              >
                <span style={{ color: "white", fontWeight: "bold" }}>
                  댓글 삭제
                </span>
              </Button>
            </div>
          ))}
        </div>
      </ContainerDiv>
    </div>
  );
};

export default CarpoolDetail;
