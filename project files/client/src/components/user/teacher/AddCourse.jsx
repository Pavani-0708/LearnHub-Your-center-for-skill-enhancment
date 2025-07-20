import React, { useState, useContext } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { UserContext } from '../../../App';
import axiosInstance from '../../common/AxiosInstance';

const AddCourse = () => {
  const user = useContext(UserContext);

  const [addCourse, setAddCourse] = useState({
    userId: user.userData._id,
    C_educator: '',
    C_title: '',
    C_categories: '',
    C_price: '',
    C_description: '',
    sections: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseTypeChange = (e) => {
    setAddCourse((prev) => ({ ...prev, C_categories: e.target.value }));
  };

  const addInputGroup = () => {
    setAddCourse((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          S_title: '',
          S_description: '',
          S_content: null,
        },
      ],
    }));
  };

  const handleChangeSection = (i, e) => {
    const { name, value, files } = e.target;
    const updatedSections = [...addCourse.sections];

    if (name === 'S_content') {
      updatedSections[i][name] = files[0]; // assign File object
    } else {
      updatedSections[i][name] = value;
    }

    setAddCourse((prev) => ({ ...prev, sections: updatedSections }));
  };

  const removeInputGroup = (i) => {
    const updatedSections = addCourse.sections.filter((_, idx) => idx !== i);
    setAddCourse((prev) => ({ ...prev, sections: updatedSections }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('userId', addCourse.userId);
    formData.append('C_educator', addCourse.C_educator);
    formData.append('C_title', addCourse.C_title);
    formData.append('C_categories', addCourse.C_categories);
    formData.append('C_price', addCourse.C_price);
    formData.append('C_description', addCourse.C_description);

    addCourse.sections.forEach((section) => {
      formData.append('S_title', section.S_title);
      formData.append('S_description', section.S_description);
      if (section.S_content) {
        formData.append('S_content', section.S_content);
      }
    });

    try {
      const res = await axiosInstance.post('/api/user/addcourse', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 201 && res.data.success) {
        alert(res.data.message);
      } else {
        alert('Failed to create course');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error occurred. Only .mp4 or images are allowed.');
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Course Type</Form.Label>
            <Form.Select value={addCourse.C_categories} onChange={handleCourseTypeChange} required>
              <option value="">Select categories</option>
              <option>IT & Software</option>
              <option>Finance & Accounting</option>
              <option>Personal Development</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Course Title</Form.Label>
            <Form.Control
              name="C_title"
              value={addCourse.C_title}
              onChange={handleChange}
              type="text"
              placeholder="Enter Course Title"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Educator Name</Form.Label>
            <Form.Control
              name="C_educator"
              value={addCourse.C_educator}
              onChange={handleChange}
              type="text"
              placeholder="Educator"
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Course Price (₹)</Form.Label>
            <Form.Control
              name="C_price"
              value={addCourse.C_price}
              onChange={handleChange}
              type="number"
              placeholder="0 for free"
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Course Description</Form.Label>
          <Form.Control
            as="textarea"
            name="C_description"
            value={addCourse.C_description}
            onChange={handleChange}
            rows={3}
            required
          />
        </Form.Group>

        <hr />
        {addCourse.sections.map((section, index) => (
          <div key={index} className="border rounded p-3 mb-3 position-relative">
            <Button
              variant="outline-danger"
              size="sm"
              className="position-absolute top-0 end-0 m-2"
              onClick={() => removeInputGroup(index)}
            >
              ❌ Remove
            </Button>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Section Title</Form.Label>
                <Form.Control
                  type="text"
                  name="S_title"
                  value={section.S_title}
                  onChange={(e) => handleChangeSection(index, e)}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Section Content</Form.Label>
                <Form.Control
                  type="file"
                  name="S_content"
                  onChange={(e) => handleChangeSection(index, e)}
                  accept="video/*,image/*"
                  required
                />
              </Form.Group>
            </Row>
            <Form.Group className="mt-2">
              <Form.Label>Section Description</Form.Label>
              <Form.Control
                as="textarea"
                name="S_description"
                value={section.S_description}
                onChange={(e) => handleChangeSection(index, e)}
                rows={2}
                required
              />
            </Form.Group>
          </div>
        ))}

        <Button variant="outline-secondary" size="sm" onClick={addInputGroup} className="mb-3">
          ➕ Add Section
        </Button>

        <Button variant="primary" type="submit">
          Submit Course
        </Button>
      </Form>
    </div>
  );
};

export default AddCourse;