import React, { useState } from "react";
import { createCardUsingPrompt } from "../../service/GenerationService";
import { CardPrompt } from "../../model/cardPromptModel";
import { useSelector } from "react-redux";

const CardGenerationForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    imagePrompt: "",
    descriptionPrompt: "",
    agreed: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const selectedUser = useSelector((state : any) => state.userReducer.selectedUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formValues.agreed) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let cardPrompt : CardPrompt = {
        userId: selectedUser.id,
        imagePrompt: formValues.imagePrompt,
        descriptionPrompt: formValues.descriptionPrompt,
      }

      const result = await createCardUsingPrompt(cardPrompt);
      
      if (result.status == 200) {
        setSuccess(true);
      } else {
        setError("Failed to create card.");
      }
    } catch (err) {
      setError("An error occurred while creating the card.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Demande de creation envoyer avec succes !</p>}

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
};

export default CardGenerationForm;
