import React, { useState } from "react";
import styled from "styled-components";
import EmptyImage from "../../assets/default-image.svg";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Select from "../../assets/Select.svg";
import Chip from "@material-ui/core/Chip";
import { Autocomplete } from "@material-ui/lab/";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles({
  select: {
    "& .MuiSvgIcon-root": {
      display: "none",
    },
  },
});

const useStyles2 = makeStyles((theme) => ({
  root: {
    width: 300,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 5,
    position: "relative",
    backgroundColor: "white",
    border: "1px solid #CEA0E3",
    fontSize: 18,
    padding: "5px 7px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    background: `url(${Select}) no-repeat 95% 50%`,
    "&:focus": {
      borderRadius: 5,
      borderColor: "#CEA0E3",
      backgroundColor: "white",
      boxShadow: "0 0 0 0.2rem rgba(206,160,227,.25)",
    },
  },
}))(InputBase);

const getDateFormat = (date) => {
  const year = parseInt(date / 10000);
  const month = parseInt((date % 10000) / 100);
  const day = date % 100;
  return `${year}년 ${month}월 ${day}일`;
};

const CardInfo = ({ data, isReadOnly, handleChange }) => {
  //@meterial-ui에서 받아온 style을 사용하기 위해 변수에 넣음
  const classes = useStyles();
  const classes2 = useStyles2();
  const { image, date, weather, tags, summary } = data;
  const [userImg, setUserImg] = useState(null);

  const onTagsChange = (e, values) => {
    e.target.name = "tags";
    console.log("저장될 value값", values);
    handleChange(e, values);
  };

  // 이미지가 들어오면 처리
  const handleChangeFile = (event) => {
    let reader = new FileReader();
    const data = event.target.files[0]; // 받아온 이미지는 여기에 File 객체로 저장됩니다

    if (data) {
      reader.readAsDataURL(data);
    }

    console.log("업로드한 데이터 뭐가 있는지", data);
    event.target.name = "image";

    reader.onloadend = () => {
      setUserImg({
        file: data, // 서버로 전송할 File 객체입니다
        preview: reader.result, // 여기서 reader.result는 미리보기 이미지를 보여줍니다
      });
      handleChange(event, reader.result);
      console.log("values값", reader.result);
    };
    console.log("set된 userImg 뭔지", userImg);
  };

  const Feels = ["기쁨", "슬픔", "웃김", "걱정됨", "위로받음"];
  return (
    <>
      <CssBaseline />
      <CardInfoWrap>
        <div className="info__photo">
          {isReadOnly ? (
            <img
              src={image ? image : EmptyImage}
              width={image && "210px"}
              height={image && "210px"}
              alt=""
            />
          ) : (
            <input
              type="file"
              name="ImageUpload"
              accept="image/*"
              onChange={handleChangeFile}
            />
          )}
        </div>
        <div className="info__data-wrap">
          <p className="info__date">
            <span className="small-title">날짜</span>
            {getDateFormat(date)}
          </p>
          <span className="small-title">날씨</span>
          {isReadOnly ? (
            <input
              type="text"
              readOnly={isReadOnly}
              value={weather}
              placeholder="날씨를 선택해주세요"
            />
          ) : (
            <FormControl>
              <NativeSelect
                className={classes.select}
                value={weather}
                name="weather"
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                <option value="" disabled>
                  날씨를 선택해주세요
                </option>
                <option value={"맑음"}>맑음</option>
                <option value={"구름"}>구름</option>
                <option value={"흐림"}>흐림</option>
                <option value={"비"}>비</option>
                <option value={"눈"}>눈</option>
                <option value={"바람"}>바람</option>
              </NativeSelect>
            </FormControl>
          )}
          <div className="info__tags">
            <span className="small-title">태그</span>
            {isReadOnly ? (
              tags.length > 0 ? (
                tags.map((tag, index) => {
                  return (
                    <div key={index} className="info__tags--tag">
                      {tag}
                    </div>
                  );
                })
              ) : (
                <input
                  type="text"
                  readOnly={true}
                  value=""
                  placeholder="태그를 선택해주세요"
                />
              )
            ) : (
              <Autocomplete
                className={classes2.root}
                multiple
                id="tags-filled"
                options={Feels.map((option) => option)}
                defaultValue={tags}
                onChange={onTagsChange}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Tags"
                    placeholder="테그를 입력하세요"
                  />
                )}
              />
            )}
          </div>
          <span className="small-title">한 줄 요약</span>
          <input
            className="info__summary"
            type="text"
            name="summary"
            placeholder="입력해 주세요"
            value={summary}
            onChange={handleChange}
            readOnly={isReadOnly}
            style={{ backgroundColor: isReadOnly ? "white" : "#EFEFEF" }}
          />
        </div>
      </CardInfoWrap>
    </>
  );
};
export default CardInfo;

const CardInfoWrap = styled.div`
  display: flex;
  width: 642px;
  margin: 19px auto;
  font-size: 18px;
  .info {
    &__photo {
      width: 210px;
      height: 210px;
      background-color: #c4c4c4;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__data-wrap {
      margin-left: 40px;
    }
    &__date {
      margin: 15px auto 25px auto;
    }
    &__tags {
      display: flex;
      margin: 21px 0 24px 0;
      &--tag {
        font-size: 14px;
        color: white;
        background-color: #cea0e3;
        padding: 4px 11px;
        margin-right: 7px;
        border-radius: 5px;
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &__summary {
      width: 236px;
      height: 30px;
      box-sizing: border-box;
      border: none;
      padding: 2px;
      font-size: 18px;
    }
  }
  span {
    display: inline-block;
    font-weight: bold;
    width: 82px;
    padding-right: 18px;
  }
  input {
    border: none;
    font-size: 18px;
    padding: 0;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #c4c4c4;
    }
  }
  .small-title {
    width: 95px;
  }
`;
