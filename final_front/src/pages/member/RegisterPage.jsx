import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import { checkPassword, validateBirthdate, validateEmail, validateHp, validateName, validateNickname, validatePassword } from '../../util/validateLogic';
import { MyButton, MyInput, MyLabel, MyLabelAb, PwEye, SignupForm } from '../../styles/formStyle';
import { onAuthChange } from '../../util/authLogic';

const RegisterPage = ({authLogic}) => {
  const auth = authLogic.getUserAuth();
  const userAuth = useSelector(state => state.userAuth);
  const type = window.location.search.split('&')[0].split('=')[1];
  const [reSignCheck, setReSignCheck] = useState(false);
  const navigate = useNavigate();
  const[submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
    hover: false
  });
  const toggleHover = () => {
    if(submitBtn.hover){
      setSubmitBtn({...submitBtn, hover: false, bgColor: 'rgb(105, 175, 245)'});
    } else {
      setSubmitBtn({...submitBtn, hover: true, bgColor: 'rgb(72, 145, 218)'});
    }
  }
  const[post, setPost] = useState({
    zipcode: "",
    addr: "",
    addrDetail: ""
  })
  const [memInfo, setMemInfo] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    birthday: "",
    mobile: "",
    nickname: "",
    gender: "없음"
  });
  const [comment, setComment] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    birthday: "",
    mobile: "",
    nickname: ""
  });
  const [star,setStar] = useState({
    email: "*",
    password: "*",
    password2: "*",
    name: "*",
    mobile: "*",
    nickname: "*",
    birthday: "*"
  })
  const [passwordType, setPasswordType] = useState([
    {
      type:'password',
      visible:false
    },
    {
      type:'password',
      visible:false
    }
  ]);
  const [googleEmail, setGoogleEmail] = useState('');

  useEffect(()=> {
    const onAuth = async() => {
      const user = await onAuthChange(userAuth.auth) ;
      if(user){
        setGoogleEmail(user.email);
        setStar({
          email: "",
          password: "*",
          password2: "*",
          name: "*",
          mobile: "*",
          nickname: "*",
          birthday: "*"
        });
        setMemInfo({
          email: user.email,
          password: "",
          password2: "",
          name: "",
          mobile: "",
          nickname: "",
          birthday: "",
          gender:"없음"
        });
      }
    };
    onAuth();
  },[setGoogleEmail, setStar,setMemInfo, userAuth.auth]);

  const passwordView = (e) => {
    const id = e.currentTarget.id;
    if(id==="password") {
      if(!passwordType[0].visible) {
        setPasswordType([{type: 'text', visible: true},passwordType[1]]);
      } else {
        setPasswordType([{type: 'password', visible: false},passwordType[1]]);
      }
    } else if(id==="password2") {
      if(!passwordType[1].visible) {
        setPasswordType([passwordType[0],{type: 'text', visible: true}]);
      } else {
        setPasswordType([passwordType[0],{type: 'password', visible: false}]);
      }
    }
  }
  const changeMemInfo = (e) => {
    console.log('changeMemInfo');
    const id = e.currentTarget.id;
    console.log(id);
    const value = e.target.value;
    console.log(value);
    setMemInfo({...memInfo, [id]: value});
  }
  //닉네임 중복확인 
  const overlap = async(key) => {
    console.log('닉네임 중복확인' + key);
    let params;
    if (key === 'email') {
      params = {MEM_EMAIL: memInfo[key], type:'overlap'}
    } else {
      params = {MEM_NICKNAME: memInfo[key], type:'overlap'}
    }
    console.log(params);
    let response = {data: 0}
    // dbLogic 필요
    // response = await memberListDB(params)
    console.log(response.data)
    // Array(1)
    // 0: {MEM_UID:"karina", MEM_NAME:"유지민"}
    const data = JSON.stringify(response.data)
    const jsonDoc = JSON.parse(data)
    if (jsonDoc ) {
      console.log(jsonDoc[0].MEM_NAME)
    }
    else {
      console.log('입력한 닉네임은 존재하지 않습니다')
    }
    // 닉네임 존재 시
    if (response.data) {
    }
    // 닉네임 없을 시
    else {
    }
  } 

  const validate = (key, e) => {
    let result;
    if(key==='email'){
      result = validateEmail(e); 
    } else if(key==='nickname'){
      result = validateNickname(e); 
    } else if(key==='password'){
      result = validatePassword(e); 
    } else if(key==='password2'){
      result = checkPassword(memInfo.password, e); 
    } else if(key==='name'){
      result = validateName(e); 
    } else if(key==='hp'){
      result = validateHp(e); 
    } else if(key==='birthday'){
      result = validateBirthdate(e); 
    } 
    setComment({...comment, [key]: result}); 
    if(result){
      if(result===' '){
        setStar({...star, [key]:""});
      } else {
        setStar({...star, [key]:"*"});
      }
    }else {
      setStar({...star, [key]:""});
    }
  }
  const checkboxLable = ['없음','남자','여자']
  const Checkbox = checkboxLable.map((item, index) => (
    <Form.Check inline label={item} value={item} name="group1" type='radio' checked={memInfo.gender===item?true:false} readOnly
    id={`inline-radio-${item}`} key={index} onClick={(e)=> {setMemInfo({...memInfo, gender: e.target.value})}}/>
  ))
  
  return (
    <div>
      <Sidebar />
      <div className='center'>
      <SignupForm suggested={false}>
      {/* 아이디 */}
      <div style={{display: 'flex' , flexWrap: 'wrap'}}>
        <MyLabel> 아이디 <span style={{color:"red"}}>{star.id}</span>
          <MyInput type="text" id="id" placeholder="아이디를 입력해주세요" 
                    onChange={(e)=>{changeMemInfo(e); validate('id', e);}}/>
                    <MyLabelAb>{comment.id}</MyLabelAb>
        </MyLabel>
        <MyButton type="button" onClick={()=>{overlap('id');}}>중복확인</MyButton>
      </div>
      {/* 비밀번호 */}
      <MyLabel> 비밀번호 <span style={{color:"red"}}>{star.password}</span>
        <MyInput type={passwordType[0].type} id="password" autoComplete="off" placeholder="비밀번호를 입력해주세요" 
                onKeyUp={(e)=>{setComment({...comment, password2: checkPassword(e.target.value,memInfo.password2)});}} 
                onChange={(e)=>{changeMemInfo(e);  validate('password', e);}}/>
        <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[0].visible?"gray":"lightgray"}`}}>
          <PwEye className="fa fa-eye fa-lg"></PwEye>
        </div>
        <MyLabelAb>{comment.password}</MyLabelAb>
        </MyLabel>

        <MyLabel> 비밀번호 확인 <span style={{color:"red"}}>{star.password2}</span>
        <MyInput type={passwordType[1].type} id="password2"  autoComplete="off" placeholder="비밀번호를 한번 더 입력해주세요"
                onChange={(e)=>{changeMemInfo(e); validate('password2', e.target.value)}}/>
        <div id="password2" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[1].visible?"gray":"lightgray"}`}}>
          <PwEye className="fa fa-eye fa-lg"></PwEye>
        </div>
        <MyLabelAb>{comment.password2}</MyLabelAb>
        </MyLabel>         
      
      {/* 이름 */}
      <div style={{padding: '30px 30px 0px 30px'}}>
        <MyLabel> 이름 <span style={{color:"red"}}>{star.name}</span>
          <MyInput type="text" id="name" defaultValue={memInfo.name} placeholder="이름을 입력해주세요" 
          onChange={(e)=>{changeMemInfo(e); validate('name', e);}}/>
          <MyLabelAb>{comment.name}</MyLabelAb>
        </MyLabel>
      {/* 닉네임 */}
        <MyLabel> 닉네임 <span style={{color:"red"}}>{star.nickname}</span>
          <MyInput type="text" id="nickname" defaultValue={memInfo.nickname} placeholder="닉네임을 입력해주세요" 
          onChange={(e)=>{changeMemInfo(e); validate('nickname', e);}}/>
          <MyLabelAb>{comment.nickname}</MyLabelAb>
        </MyLabel>
        <MyButton type="button" onClick={()=>{overlap('nickname')}}>중복확인</MyButton>
      {/* 이메일 */}
      <MyLabel> 이메일 <span style={{color:"red"}}>{star.email}</span>
        <MyInput type="email" id="email" placeholder="이메일를 입력해주세요" 
        onChange={(e)=>{changeMemInfo(e); validate('email', e);}}/>
        <MyLabelAb>{comment.email}</MyLabelAb>
      </MyLabel>
      <MyButton type="button" onClick={()=>{overlap('email');}}>중복확인</MyButton>
      {/* 전화번호 */}
      <MyLabel> 전화번호 <span style={{color:"red"}}>{star.mobile}</span>
        <MyInput type="text" id="mobile" defaultValue={memInfo.mobile} placeholder="전화번호를 입력해주세요" 
        onChange={(e)=>{changeMemInfo(e); validate('hp', e);}} />
        <MyLabelAb>{comment.mobile}</MyLabelAb>
      </MyLabel>
      {/* 성별 */}
      <MyLabel style={{margin:0}}> 성별
      <div style={{marginTop:10}} key={`inline-radio`} className="mb-3">
        {Checkbox}
      </div>
      </MyLabel>

      {/* 생년월일 */}
      {/* <input type="text" name="birth" readonly />
				<span id="delete" style="color: red; position: relative; right: 25px; display: none;"><i class="fas fa-times font-img"></i></span> */}
      <MyLabel> 생년월일 <span style={{color:"red"}}>{star.birthday}</span>
        <MyInput type="text" id="birthday" defaultValue={memInfo.birthday} placeholder="생년월일을 입력해주세요" 
        onChange={(e)=>{changeMemInfo(e); validate('birthday', e);}}/>
        <MyLabelAb>{comment.birthday}</MyLabelAb>
      </MyLabel>
      </div>
      </SignupForm>
      </div>
    </div>
    
  )
}

export default RegisterPage