import React from 'react';
import styles from './about.css';
import { Row, Col } from 'react-bootstrap';
import ProjectCard from './ProjectCard'
import ProjectsList from './ProjectList';
import projectsData from './../../../data/projects.json';


const AboutMePage = () => {
  return (
    <>
      <Row className="">
        <Col>
          <h2 className="fs-2 m-4">
            Hello! My name is Viktor. I am a Front-end developer.
          </h2>
          <p className="fs-2 m-5 text-center">I would like to show you a few of my worksheets.</p>
        </Col>
      </Row>

      <ProjectsList projects={projectsData} />
    </>
  );
};

export default AboutMePage;