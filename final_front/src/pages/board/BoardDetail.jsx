import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  selectBoardDetailDB,
  selectBoardListDB,
} from "../../axios/board/boardLogic";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const BoardDetail = () => {
  const navigate = useNavigate();
  // URL 파라미터에서 게시글 번호 가져오기
  const { boardNo } = useParams();

  // 게시글 정보를 담을 객체
  const [board, setBoard] = useState({
    boardNo: 0,
    memberId: "",
    boardTitle: "",
    boardContent: "",
    boardDate: "",
  });
  // 컴포넌트가 처음 로딩될 때, 백엔드 API를 호출하여 게시글 정보를 가져옴
  // useEffect(() => {

  //   jsonBoardList();
  // }, []);
  useEffect(() => {
    //파라미터로 넘어오는 deptno가 바뀌면 *다시 실행됨*
    const asyncDB = async () => {
      const res = await selectBoardDetailDB({ boardNo });
      console.log("여기보세요 =- ", res.data);
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      setBoard({
        boardNo: jsonDoc.boardNo,
        memberId: jsonDoc.memberId,
        boardTitle: jsonDoc.boardTitle,
        boardContent: jsonDoc.boardContent,
        boardDate: jsonDoc.boardDate,
      });
      if (res.data) {
        console.log("if문 안에 있니?", res.data);
        // 가져온 게시글 정보를 board state에 저장
        setBoard(res.data);
      } else {
        console.log("게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {
      //언마운트 될 때 처리할 일이 있으면 여기에 코딩할 것
    };
  }, [boardNo]);

  /*   if (!board.boardTitle) {
    console.log(board.boardTitle)
    return <div>데이터를 불러오는 중입니다...</div>;
  } */
  return (
    <div>
      <Sidebar />
      <div className="center">
        <Header />
        <br />
        <h2>게시글 훔쳐봐야지? 가야지?</h2>
        <div>
          <form method="post">
            <input type="hidden" name="boardNo" value="" />
            <div>
              <label>제목</label>
              <span
                style={{ width: "300px", margin: "10px" }}
                type="text"
                name="boardTitle"
                required
                class="form-control form-control-lg"
                id="inputLarge"
              >
                {board.boardTitle}
              </span>
            </div>
            <div>
              <label>내용</label>
              <span
                style={{
                  width: "300px",
                  margin: "10px",
                  height: "300px",
                  fontSize: "40px",
                }}
                name="boardContent"
                required
                rows="10"
                class="form-control"
                id="exampleTextarea"
              >
                {board.boardContent}
              </span>
            </div>
            <div>
              <label class="form-block">첨부파일</label>
              <input
                style={{ width: "300px", margin: "10px" }}
                type="file"
                name="attach"
                accept="image/*"
                multiple="multiple"
                class="form-control"
              />
            </div>
            <div>
              <Button
                style={{ margin: "10px" }}
                onClick={() => navigate("/together")}
              >
                목록으로
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
