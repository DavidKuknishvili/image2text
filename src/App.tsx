import { useRef, useState } from "react";
import styled from "styled-components";
import T from 'tesseract.js'


function App() {

  const [image, setImage] = useState<Blob | MediaSource >(new Blob());
  const [text, setText] = useState<any>();

  const handleImageChange = (e:any) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  T.recognize(URL.createObjectURL(image), 'eng')
  .then(out => {
    // console.log(out.data.text)
    setText(out.data.hocr)})
  

    const divRef = useRef<any>();

    function handleCopy() {
      const text = divRef?.current?.innerText;
      navigator.clipboard.writeText(text);
    }
  

    console.log(text)

  return (
    <Container>
      <Slable htmlFor="inp"> upload image</Slable>
      <input style={{ display: "none" }} type="file" name="" id="inp"  onChange={handleImageChange} />
      <SubContainer ref={divRef}>
        <Img src={URL.createObjectURL(image)} alt="" />
        <TextContainer>

        <code dangerouslySetInnerHTML={{ __html: text }}></code>
        </TextContainer>
      </SubContainer>
      <button onClick={handleCopy}>copy</button>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    flex-direction: column;
}
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  /* background-color: rgb(0, 123, 255); */
  height:60vh;
  margin-top:15px;
  border: 2px solid #3e3e3e;
  border-radius:20px
`;


const Slable = styled.label`
  background-color: rgb(0, 123, 255);
  padding: 20px 30px;
  border-radius: 10px;
  cursor:pointer;
  &:hover{
    background-color: rgb(128, 189, 255);
    transition: 900ms
  }
`;

const Img = styled.img`
  width:50%;
  height:100%;
  object-fit: contain;
`

const TextContainer = styled.div`
  width:50%;
  height:100%;


`

export default App;
