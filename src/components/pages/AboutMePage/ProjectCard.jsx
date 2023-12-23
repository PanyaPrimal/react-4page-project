import React, { useState } from 'react';
import { Card, Col } from 'react-bootstrap';

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!project || !project.imageUrl || !project.title || !project.description) {
    return null;
  }

  const { imageUrl, title, description, demonstration, code } = project;

  const maxDescriptionLength = 40;
  const truncatedDescription = description.length > maxDescriptionLength
    ? `${description.substring(0, maxDescriptionLength)}...`
    : description;

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
    <Col
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      xs={12}
      s={4}
      md={4}
      className={`project-card mb-4 ${isHovered ? 'hovered' : ''}`}
    >
      <Card className={`card ${isHovered ? 'hovered z-1' : ''} h-100`}>
        {imageUrl && (
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={title}
            className={`card__image ${isHovered ? 'hovered' : ''}`}
          />
        )}
        
        <Card.Body className={`card__body ${isHovered ? 'hovered' : ''}`}>
          <Card.Title className={`fw-bold card__title ${isHovered ? 'hovered z-1' : ''}`}>
            {title}
          </Card.Title>

          <Card.Text className={`card__description ${isHovered ? 'hovered z-1' : ''}`}>
            {isHovered ? description : truncatedDescription}
          </Card.Text>

          <div className={`card__buttons d-flex justify-content-center gap-3 ${isHovered ? 'hovered z-1' : ''}`}>
            <a href={code} className="btn btn-primary w-auto">
              Code
            </a>
            <a href={demonstration} className="btn btn-primary w-auto text-nowrap">
              Web page
            </a>
          </div>

          <div className={`card__overlay ${isHovered ? 'hovered z-0' : ''}`} style={{ background: `url(${imageUrl}) center/cover` }}></div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProjectCard;