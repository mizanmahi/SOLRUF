import { Typography } from "@mui/material";
import React from "react";
import TeamCard from "./TeamCard";
import { CardsWrapper, TWrapper } from "./TeamStyle";

const Team = () => {
  return (
    <TWrapper>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", lineHeight: "3rem", margin: "0" }}
      >
        Our Team
      </Typography>
      <CardsWrapper>
        <TeamCard
          image={
            "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Team/sumit.jpg"
          }
          name="Sumit Agarwal"
          position="Founder & CEO"
          linkedinUrl="https://www.linkedin.com/in/sumit-agarwal-322969102/"
          bio="B.Tech. in Electrical Engineering from IIT KGP, 2015-19"
        />
        <TeamCard
          image={
            "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Team/sazzad.jpeg"
          }
          name="Sazzad Hussain"
          position="Technical Head"
          linkedinUrl="https://www.linkedin.com/in/sazzadhussain/"
          bio="Ex-CTO (ResellMall), B.Tech, Computer science, KIST"
        />
        <TeamCard
          image={
            "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Team/mizan.jpeg"
          }
          name="Md Mizanur Rahman"
          position="Front-end Developer"
          linkedinUrl="https://www.linkedin.com/in/mizan-mahi/"
          bio="An Aspiring Full-stack Engineer"
        />
        <TeamCard
          image={
            "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Team/pramod.jpeg"
          }
          name="Pramod Gunjarge"
          position="Operations Manager"
          linkedinUrl="https://www.linkedin.com/in/pramod-gunjarge-534620b6/"
          bio="5 years of experience in Cosmic Solar"
        />
        <TeamCard
          image={
            "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Team/vanshika.jpeg"
          }
          name="Vanshika Goel"
          position="UI/UX & Graphic Designer"
          linkedinUrl="https://www.linkedin.com/in/vanshika-goel-692328226/"
          instagramUrl="https://www.instagram.com/vani.25_/"
          bio=""
        />
        <TeamCard
          image={
            "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Team/kushi.jpeg"
          }
          name="Kushi D Athma"
          position="Business Development Intern"
          linkedinUrl="https://www.linkedin.com/in/kushi-athma-258799208"
          bio="BE- Industrial Engineering, BMSCE, Bangalore"
        />

        <TeamCard
          image={
            "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Team/bhavya.jpeg"
          }
          name="Bhavya Patel"
          position="Business Development Executive"
          linkedinUrl={"https://www.linkedin.com/in/bhavya-patel-743200127/"}
          bio="I am currently working on various roles exploring everything. areas of interest: finance, economics, behavioural economics, philosophy, psychology."
        />
        <TeamCard
          image={
            "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Team/yamini.jpeg"
          }
          name="Yamini Khandelwal"
          position="Content Writing Intern"
          linkedinUrl="https://www.linkedin.com/in/yamini-khandelwal-4939a21b4/"
          instagramUrl="https://instagram.com/_.yamiiiii_?igshid=YmMyMTA2M2Y="
          bio="IMBA aspirant"
        />
        <TeamCard
          image={
            "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Team/yuvraj.jpeg"
          }
          name="Yuvraj Singh"
          position="Front-end Developer Intern"
          linkedinUrl="https://www.linkedin.com/in/yuvraj-singh-b85ab71b9/"
          instagramUrl="https://www.instagram.com/curiousyuvi/"
          bio="I'm a Full Stack Developer, proficient in building beautiful, scalable and production ready front-ends."
        />
      </CardsWrapper>
    </TWrapper>
  );
};

export default Team;
