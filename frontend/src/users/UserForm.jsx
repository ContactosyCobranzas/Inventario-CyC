import React, { useState } from "react";
import { showToast } from "../common/toastNotify";

const UserForm = ({ initialData = {}, onSubmit }) => {
  const [profilePic, setProfilePic] = useState(initialData.profilePic || null);
  const [email, setEmail] = useState(initialData.email || "");
  const [password, setPassword] = useState("");
  const [preview, setPreview] = useState(initialData.profilePic || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) formData.append("profilePic", profilePic);
      onSubmit(formData);
      showToast({ message: "Usuario agregado exitosamente", type: "success" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>Editar Perfil</h2>
      <div>
        <label>Foto de perfil:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <div style={{ marginTop: 10 }}>
            <img src={preview} alt="Preview" width={100} height={100} style={{ objectFit: "cover", borderRadius: "50%" }} />
          </div>
        )}
      </div>
      <div>
        <label>Correo:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Nueva contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Dejar en blanco para no cambiar"
        />
      </div>
      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default UserForm;
