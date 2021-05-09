import React from 'react';
import LeftOff from '../../assets/left-off.svg';
import LeftOn from '../../assets/left-on.svg';
import RightOff from '../../assets/right-off.svg';
import RightOn from '../../assets/right-on.svg';
import styled from 'styled-components'; 


const Calender = ({currYear, setCurrYear, currMonth, setCurrMonth}) => {
    //요소를 렌더 여부에 상관 없이 담을 수 있는 박스가 useRef()임! 
    // const leftButton = React.useRef();
    // const rightButton = React.useRef();
    const monthList = [0,1,2,3,4,5,6,7,8,9,10,11];
    return(
        <CalendarWrap>
        <div className="calender">
            <div className="calender__year">
                <img 
                className="calender__year--left" 
                src={LeftOff} 
                alt="" 
                onClick={()=>setCurrYear(currYear-1)}
                onMouseEnter={(e)=>(e.target.src=LeftOn)}
                onMouseLeave={(e)=>(e.target.src=LeftOff)}
                />
                <div className="calender__year--title">{currYear}년</div>
                <img 
                className="calender__year--right" 
                src={RightOff} 
                alt="" 
                onClick={()=>setCurrYear(currYear+1)}
                onMouseEnter={(e)=>(e.target.src=RightOn)}
                onMouseLeave={(e)=>(e.target.src=RightOff)}
                />
            </div>
            <CalMon>
                {monthList.map((month)=>(
                    <div 
                    key={month}
                    className="button"
                    onClick={()=>setCurrMonth(month)}
                    styled={
                        month === currMonth
                        ?{fontSize:"22px",fontWeight:"bold"}
                        :{}
                    }>
                        {month+1}월
                    </div>)
                  )}
            </CalMon>
        </div>
        </CalendarWrap>
    );
};

export default Calender;

//스타일드 컴포넌트가 안먹어서 어쩔 수 없이 분리함 :(
const CalMon = styled.div`
          height: 57px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 1025px;

          .button {
            font-size: 18px;
            width: 52px;
            &:hover {
              font-size: 22px;
              font-weight: bold;
              cursor: pointer;
            }
          }
`

const CalendarWrap = styled.div`
      .calendar {
        width: 1200px;
        height: 118px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .calender__year{
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-end;
          height: 61px; 

          &--left:hover, &--right:hover {
            cursor: pointer;
          }
          &--title {
            font-size: 36px;
            font-weight: bold;
            margin: 0 25px;
            line-height: 1;
          }
        }
`;