import { async } from '@firebase/util';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Modal, Tab, Tabs } from 'react-bootstrap';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import { DeleteFestivalDB, DeleteFestReviewDB, FestivalReviewDB, FestReviewInsertDB, UpdateFestReviewDB } from '../../axios/main/Festival';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { BButton, MyButton, MyInput, MyLabel, MyLabelAb } from '../../styles/formStyle';
import '../../styles/productsdetails.css'


const FestivalsDetail = () => {
    let {festMId} =useParams();
    const navigate = useNavigate();
    const [lgShow, setLgShow] = useState(false);   //리뷰수정모달
    const reduxUser = useSelector(state => state.userStatus.user);
    console.log(reduxUser)

    /* 리뷰 */
    const [reviewContent, setReviewContent]=useState("");



    /* 리뷰 작성 textarea clear */
    const resetReviewField = () => {
      setReviewContent("");
      document.querySelector('#product_detail_review_textarea').value=null;
    };


    /* 수정중 */
    /* const [Data, setData] = useState({});
 */
    // useEffect(() => {
    //   axios.get(`/festival/festivalList?festMId=${festMId}&type=single`).then((response) => {
    //     if (response.data.success) {
    //       console.log(response.data);
    //       setData(response.data.data[0]);
    //       console.log(response.data.data[0])
    //     } else {
    //       alert("상세 정보 가져오기를 실패했습니다.");
    //     }
    //   });
    // }, []);
/* 수정중 */
    



    /* 리뷰  관련*/
    const inputReviewContent= useCallback((e) => {
      setReviewContent (e)
    },[])
    
    
    /* 리뷰 인서트 요기  */
    const insertReview=async()=>{
const freview={
  reviewContent,
  reviewFestmid:festMId,
  }
  const res =await FestReviewInsertDB(freview)
  //console.log(freview)
  if(!res.data){
  }
  else{
  }
  navigate('/productsDetail/'+festMId)
  resetReviewField()
}


/* 상품삭제 */
const deleteProducts=async()=>{
const festival={
  fest_m_id:festMId,
}
const res = await DeleteFestivalDB(festival)
console.log(festival)
if(!res.data){
}
else{
}
navigate(-1)
console.log(festMId)
}




//리뷰컴포
const ReviewList =()=>{
  const [freviews, setFreviews] = useState([]);
  const [reviewRevisedContent, setReviewRevisedContent]=useState("");

  const inputReviewRevisedContent
  = useCallback((e) => {
    setReviewRevisedContent (e)
    console.log(e.value)
  },[])
  useEffect(() => {FestivalReviewDB().then(setFreviews); }, []);
  const click=()=>{
    setLgShow(true)
  }
  return(
    <>
    {freviews && freviews.map((review, i) => {
      if(festMId===review.reviewFestmid){
      return(
        <div key={review.reviewNo} className="product_detail_review_comment" style={{borderBottom:'1px solid lightgray', width:'1100px', margin:'50px'}}>
<h3>
{review.reviewContent}
</h3>
id:  {review.reviewMemid}      등록일시: {review.reviewRegdate}    
리뷰번호: {review.reviewNo}
{/* test_ reviewNo: {review.reviewNo} */}
{
  //로그인 작업 후 하단 주석 해제 예정 , session에 로그인한 사람과 작성자 일치 시 수정, 삭제 버튼 보이기 
  // sessionStorage.getItem('Member_name')==='Member_name(작성자)'&&       
  <div>
                <BButton style={{width:"80px", height:"38px"}} onClick={click} >수정</BButton>


{/*/////////////////////////////리뷰 수정 모달//////////////////////////////////*/}

<Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg" >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            리뷰수정
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

<div className="form-floating mb-3">
<textarea 
onChange={  (e)=>{inputReviewRevisedContent(e.target.value)}} 
className="form-control2" placeholder="Leave a comment here" id="product_detail_review_revised_textarea" style={{height: '300px', margin:'10px', maxWidth:'1200px'}}></textarea>
<button className="reviseBtn" onClick={async()=>{
                      const freview={
                        reviewNo:review.reviewNo,
                        reviewContent:reviewRevisedContent,
                  }
const res = await UpdateFestReviewDB(freview);
                  if(!res.data){
                  }
                  else{
                  }
setLgShow(false)
                  console.log('수정완료'+ reviewRevisedContent + review.reviewNo)
                  console.log('리뷰번호' +review.reviewNo)
                  }
}>ddddd </button>
</div><br/>

        </Modal.Body>
      </Modal>
{/* //////   리뷰 수정용 모달    여기까지///////*/}



                <BButton style={{width:"80px", height:"38px"}} onClick={async()=>{
    const freview={
      review_no:review.reviewNo,
}
const res = await DeleteFestReviewDB(freview);
if(!res.data){
}
else{
}
navigate('/productsDetail/'+festMId)
console.log('삭제완료')}}>삭제</BButton>
                </div>
}
</div>
)  //안쪽리턴
}
})} 
</>
  ) //리턴끝
}  //ReviewList 끝







    
    return(
      <>
      <Sidebar />
      <div className="center">
      출력{festMId}
       {/* 출력{Data} */}
        <Header />
        <h2>상품 상세페이지....</h2>
        
  {/* 로그인 작업 후 하단 주석 해제 예정 , session에 로그인한 사람이 관리자일경우 삭제 버튼 보이기 
   {sessionStorage.getItem('Auth')===''관리자"'&&       
   */}
  <div>
                <BButton style={{width:"200px", height:"38px", backgroundColor:'black' }} onClick={deleteProducts} >상품삭제(누르지마세요.)</BButton>
</div>


<div className="totalcontainer"> 
{/* //////////////////////////////////////탑 섹션///////////////////////////////////////////////////////////////////// */}
<section>
        <div className="topcontainer" >
                               <div className="product_detail_imgdiv">
                                         <img className="product_detail_img" src={'../images_key/WOONGS.jpg'}  alt="상품사진" />
                               </div>
                               <div className="product_detail_info">
                               <div className="product_detail_head">
                                <h3 className="product_title">타이틀 및 상세 설명 여기</h3>
                                <p className="product_sub_title">subtitle</p>
                                </div>
                                <div className="product_info" ></div>
                                <ul className="product_lnfo_list_col2">
                                <li className="product_info_list"><span className="product_info_title">장소</span><div className="product_info_desc">fest_location</div></li>
                                <li className="product_info_list"><span className="product_info_title">관람시간</span><div className="product_info_desc">fest_runtime</div></li>
                                <li className="product_info_list"><span className="product_info_title">기간</span><div className="product_info_desc">fest_startdate~fest_enddate</div></li>
                               <li className="product_info_list"><span className="product_info_title">관람등급</span><div className="product_info_desc">fest_age</div></li>
                                </ul>
                     <ul className="product_lnfo_list_col2">
                                <li className="product_info_list"><span className="product_info_title">가격</span><div className="product_info_desc"><ul className="product_info_sublist"><li className="product_info_subitem">일반석<em className="text_emphasis"> fest_price </em>원</li></ul></div></li>
                                <li className="product_info_list"><span className="product_info_title">할인</span><div className="product_info_desc"><ul className="product_info_sublist"><li className="product_info_subitem">신한카드<em className="text_emphasis"> %%%% </em>할인</li></ul></div></li>
 </ul>
                               </div>
        </div>
</section>
{/* //////////////////////////////////////미드 섹션////////////////////////////////////////////////////////////////// */}

<section>
<div className="midContainerCalendarAndRestSeats">
                   <span className="calendar">
                    <Calendar/>
</span>
<span className="calendarands1">
내용물1
</span>
<span className="calendarands2">
잔여좌석<br></br>
<Button className="researvebtn" onClick={() => navigate("/payment/"+festMId)}>예매하기</Button>

</span>
</div>
</section>
{/* ////////////////////////////////////// 바텀 섹션///////////////////////////////////////////////////////////////////// */}
<section>
  <div className="bottomcontainer" style={{marginLeft:'220px'}}>
<Tabs style={{maxWidth:'1200px'}}
          defaultActiveKey="product_detail_description"
          id="justify-tab-example"
          className="product_detail_tabs"
          justify
        >
          <Tab eventKey="product_detail_description" title="상세정보">
            상품상세정보 - img src 예정
            <div className="product_detail_description"  style={{maxWidth:'1250px', height:'1000px', border: '1px solid red'}}>

            </div>
          </Tab>
          <Tab eventKey="product_detail_review" title="상품리뷰">
리뷰리뷰
          <div className="product_detail_review" style={{maxWidth:'1250px', height:'1000px', border: '1px solid red'}}>

<div className="product_detail_review_heading"  style={{margin:'50px', borderBottom:'1px solid black'}}>
<h3>관람 후기</h3>
</div>


          <div className="form-floating" style={{textAlign:'right'}}>
  <textarea onChange={(e)=>{inputReviewContent(e.target.value)}} className="form-control" placeholder="Leave a comment here" id="product_detail_review_textarea" style={{height: '300px', margin:'10px', maxWidth:'1200px'}}></textarea>
  <label htmlFor="floatingTextarea">관람후기</label>
<button className="reviewbtn" onClick={insertReview} style={{backgroundColor:'black', width:'250px', height:'50px', color:'white', margin:'10px 80px 10px 10px', borderRadius:'10px'}}> 등록 </button> 



</div>

<ReviewList></ReviewList>



          </div>
          </Tab>
</Tabs>
</div>  {/* bottom container */}
</section>
      </div>   {/* totalcontainer div */}
</div>   {/* center div */}
       

       </>
    )
  }


export default FestivalsDetail