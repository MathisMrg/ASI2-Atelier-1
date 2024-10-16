import React, { useState } from "react";

const CardGenerationForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    imagePrompt: "",
    descriptionPrompt: "",
    agreed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label>Image Prompt</label>
        <input
          type="text"
          name="imagePrompt"
          value={formValues.imagePrompt}
          onChange={handleChange}
          placeholder="Image Prompt"
          className="input"
        />
      </div>

      <div>
        <label>Description Prompt</label>
        <input
          type="text"
          name="descriptionPrompt"
          value={formValues.descriptionPrompt}
          onChange={handleChange}
          placeholder="Description Prompt"
          className="input"
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="agreed"
            checked={formValues.agreed}
            onChange={handleChange}
          />
          I agree to the Terms and Conditions
        </label>
      </div>

      <button type="submit" className="submit-btn">
        Generate
      </button>
    </form>
  );
};

export default CardGenerationForm;
