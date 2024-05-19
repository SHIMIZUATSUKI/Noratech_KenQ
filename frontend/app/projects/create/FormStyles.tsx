import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 40px auto;
  max-width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const Input = styled.input`
  height: 35px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const TextArea = styled.textarea`
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Select = styled.select`
  height: 35px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
