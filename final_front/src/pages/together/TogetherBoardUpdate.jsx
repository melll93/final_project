import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { FormDiv } from "../../styles/formStyle";
import { selectTogetherDetailDB, updateTogetherDB } from "../../axios/together/TogetherLogic";

const TogetherBoardUpdate = () => {
  const navigate = useNavigate();
  const { boardTgNo } = useParams();
  const [boardTgTitle, setTitle] = useState(""); //사용자가 입력한 내용 담기
  const [boardTgDate, setDate] = useState(""); //사용자가 입력한 내용 담기
  const [boardTgContent, setContent] = useState(""); //사용자가 입력한 내용 담기

  const [board, setBoard] = useState({
    boardTgNo: 0,
    boardTgMemId: "",
    boardTgTitle: "",
    boardTgContent: "",
    boardTgDate: "",
  });

  useEffect(() => {
    const asyncDB = async () => {
      const res = await selectTogetherDetailDB({ boardTgNo });
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      console.log("asda = ", jsonDoc);
      setBoard({
        boardTgNo: jsonDoc.boardTgNo,
        boardTgMemId: jsonDoc.boardTgMemId,
        boardTgTitle: jsonDoc.boardTgTitle,
        boardTgContent: jsonDoc.boardTgContent,
        boardTgDate: jsonDoc.boardTgDate,
      });
      if (res.data) {
        console.log(jsonDoc);
        setBoard(res.data);
      } else {
        console.log("게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {};
  }, []);

  const updateBoard = async () => {
    if (!boardTgTitle) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!boardTgDate) {
      alert("날짜를 입력해 주세요.");
      return;
    }

    if (!boardTgContent) {
      alert("내용을 입력해주세요.");
      return;
    }

    const board = {
      boardTgNo: boardTgNo, // 게시글 번호
      boardTgTitle: boardTgTitle, // 제목 추가
      boardTgContent: boardTgContent, // 내용 추가
      boardTgDate: boardTgDate,
    };

    console.log("board = ", JSON.stringify(board));
    try {
      const res = await updateTogetherDB(board);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    alert("게시글 수정 완료");
    navigate("/together");
  };

  const handleTitle = useCallback((e) => {
    setTitle(e);
  }, []);

  const handleDate = (date) => {
    // "YYYY-MM-DD" 형식이 아닐 경우 에러 처리
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
      alert("날짜 형식이 올바르지 않습니다.");
      return;
    }
    // "YYYY-MM-DD" 형식으로 변환
    const formattedDate = date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    // 변환된 값을 상태 변수에 저장
    setDate(formattedDate);
    // setDate();
  };

  const handleContent = useCallback((e) => {
    setContent(e);
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="center">
        <Header />
        <br />
        <h2>게시글 훔쳐봐야지? 가야지?</h2>
        <FormDiv style={{ width: "98%", margin: "10px" }}>
          <div>
            <form method="post">
              <div>
                <label>수정 할 제목</label>
                <br />
                <input
                  id="board_tg_title"
                  type="text"
                  maxLength="50"
                  value={boardTgTitle}
                  style={{
                    width: "80%",
                    height: "40px",
                    margin: "10px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  placeholder="수정할 제목을 입력해 주세요"
                  onChange={(e) => {
                    handleTitle(e.target.value);
                  }}
                />
              </div>

              <div>
                <label>작성자</label>
                <span
                  style={{ width: "80%", margin: "10px" }}
                  type="text"
                  name="boardTgMemId"
                  required
                  class="form-control form-control-lg"
                  id="inputLarge"
                >
                  {board.boardTgMemId}
                </span>
              </div>

              <div>
                <label>수정된 날짜</label>
                <br />
                <input
                  id="board_tg_date"
                  type="date"
                  maxLength="50"
                  value={boardTgDate}
                  style={{
                    width: "80%",
                    height: "40px",
                    margin: "10px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  placeholder={
                    "YYYY-MM-DD 형식으로 입력해주세요. ex) : " +
                    new Date().toISOString().substr(0, 10)
                  }
                  onChange={(e) => {
                    handleDate(e.target.value);
                  }}
                />
              </div>

              <div>
                <label>수정할 내용</label>
                <br />
                <textarea
                  id="board_tg_date"
                  type="text"
                  maxLength="50"
                  value={boardTgContent}
                  style={{
                    width: "80%",
                    margin: "10px",
                    height: "300px",
                    fontSize: "20px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  placeholder="수정할 내용을 입력해 주세요"
                  onChange={(e) => {
                    handleContent(e.target.value);
                  }}
                />
              </div>

              <div>
                <label class="form-block">첨부파일</label>
                <input
                  style={{ width: "80%", margin: "10px" }}
                  type="file"
                  name="attach"
                  accept="image/*"
                  multiple="multiple"
                  class="form-control"
                />
              </div>

              <div>
                <Button
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    updateBoard();
                  }}
                >
                  수정하기
                </Button>
                <Button
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    if (window.confirm("정말 돌아가시겠습니까?")) {
                      navigate({
                        pathname: "/together/BoardDetail/" + board.boardTgNo,
                        state: { board },
                      });
                    }
                  }}
                >
                  돌아가기
                </Button>
              </div>
            </form>
          </div>
        </FormDiv>
      </div>
    </div>
  );
};

export default TogetherBoardUpdate;