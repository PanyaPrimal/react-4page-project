import React from 'react';
import { Row } from 'react-bootstrap';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects }) => {
  return (
    <Row>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Row>
  );
};

export default ProjectList;