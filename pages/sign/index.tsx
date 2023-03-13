import React, { LegacyRef } from "react";
import { useState, useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ProgressBar = ({ percent }: { percent: number }) => {
  const progressStyle = {
    width: `${percent}%`,
    height: "20px",
    backgroundColor: "green",
  };

  return (
    <div>
      <div style={progressStyle}></div>
    </div>
  );
};

export default function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const inputRefs = useRef<(HTMLInputElement | HTMLSelectElement)[]>([
    React.createRef<HTMLInputElement | HTMLSelectElement>(),
    React.createRef<HTMLInputElement | HTMLSelectElement>(),
    React.createRef<HTMLInputElement | HTMLSelectElement>(),
    React.createRef<HTMLInputElement | HTMLSelectElement>(),
    React.createRef<HTMLInputElement | HTMLSelectElement>(),
    React.createRef<HTMLInputElement | HTMLSelectElement>(),
    React.createRef<HTMLInputElement | HTMLSelectElement>(),
  ]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "name":
        setName(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "nickname":
        setNickname(value);
        break;
      case "birthdate":
        setBirthdate(value);
        break;
      case "gender":
        setGender(value);
        break;
      default:
        break;
    }
  };

  const handleNextClick = (): void => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    inputRefs.current[nextIndex]?.focus();
  };

  const getProgressPercent = (): number => {
    const filledInputs = [
      email,
      password,
      name,
      phone,
      nickname,
      birthdate,
      gender,
    ].filter(Boolean);
    return (filledInputs.length / 7) * 100; // there are 7 input fields in total
  };

  const isValid =
    email && password && name && phone && nickname && birthdate && gender;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    // handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs selectedIndex={currentIndex}>
        <TabList>
          <Tab>Email</Tab>
          <Tab>Password</Tab>
          <Tab>Name</Tab>
          <Tab>Phone</Tab>
          <Tab>Nickname</Tab>
          <Tab>Birthdate</Tab>
          <Tab>Gender</Tab>
        </TabList>
        <TabPanel>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              ref={inputRefs.current[0]}
            />
          </div>
          <button onClick={handleNextClick}>Next</button>
        </TabPanel>
        <TabPanel>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              ref={inputRefs.current[1]}
            />
          </div>
          <button onClick={handleNextClick}>Next</button>
        </TabPanel>
        <TabPanel>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              ref={inputRefs.current[2]}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              ref={inputRefs.current[3]}
            />
          </div>
          <button onClick={handleNextClick}>Next</button>
        </TabPanel>
        <TabPanel>
          <div>
            <label htmlFor="nickname">Nickname:</label>
            <input
              type="text"
              name="nickname"
              value={nickname}
              onChange={handleInputChange}
              ref={inputRefs.current[4]}
            />
          </div>
          <button onClick={handleNextClick}>Next</button>
        </TabPanel>
        <TabPanel>
          <div>
            <label htmlFor="birthdate">Birthdate:</label>
            <input
              type="date"
              name="birthdate"
              value={birthdate}
              onChange={handleInputChange}
              ref={inputRefs.current[5]}
            />
          </div>
          <button onClick={handleNextClick}>Next</button>
        </TabPanel>
        <TabPanel>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              name="gender"
              value={gender}
              onChange={handleInputChange}
              ref={inputRefs.current[6]}>
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button onClick={handleSubmit} disabled={!isValid}>
            Submit
          </button>
        </TabPanel>
      </Tabs>
      <ProgressBar percent={getProgressPercent()} />
    </form>
  );
}
