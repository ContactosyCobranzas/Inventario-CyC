import React, { useState } from "react";
import BackButton from "../common/BackButton";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import GlobalToastContainer from "../common/GlobalToastContainer";
import { showToast } from "../common/toastNotify";
import "./VersionesView.css";

const initialVersionData = [
  { 
    id: 1,
    equipmentCode: "PC-001", 
    softwareName: "Windows 10 Pro", 
    currentVersion: "21H2",
    lastUpdated: "2024-01-15"
  },
  { 
    id: 2,
    equipmentCode: "PC-002", 
    softwareName: "Microsoft Office", 
    currentVersion: "16.0.14326",
    lastUpdated: "2024-02-20"
  },
  { 
    id: 3,
    equipmentCode: "PC-003", 
    softwareName: "McAfee Antivirus", 
    currentVersion: "5.2.1",
    lastUpdated: "2024-01-30"
  },
];

const VersionesView = ({ onBack }) => {
  const [versionsList, setVersionsList] = useState(initialVersionData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ 
    equipmentCode: "", 
    softwareName: "", 
    currentVersion: "" 
  });

  // Filtrar versiones basado en el término de búsqueda
  const filteredVersions = versionsList.filter(version =>
    version.equipmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    version.softwareName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    version.currentVersion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setFormData({ equipmentCode: "", softwareName: "", currentVersion: "" });
    setIsModalOpen(true);
    setEditingIndex(null);
  };

  const openEditModal = (index) => {
    const versionToEdit = versionsList[index];
    setFormData({
      equipmentCode: versionToEdit.equipmentCode,
      softwareName: versionToEdit.softwareName,
      currentVersion: versionToEdit.currentVersion
    });
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const deleteVersion = (index) => {
    const updatedVersions = versionsList.filter((_, i) => i !== index);
    setVersionsList(updatedVersions);
    showToast({ 
      message: "Versión eliminada correctamente", 
      type: "success", 
      theme: "dark" 
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if (!formData.equipmentCode.trim() || !formData.softwareName.trim() || !formData.currentVersion.trim()) {
      showToast({ 
        message: "Por favor completa todos los campos", 
        type: "warning", 
        theme: "dark" 
      });
      return;
    }

    if (editingIndex !== null) {
      // Actualizar versión existente
      const updatedVersions = [...versionsList];
      updatedVersions[editingIndex] = {
        ...updatedVersions[editingIndex],
        ...formData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setVersionsList(updatedVersions);
      showToast({ 
        message: "Versión actualizada correctamente", 
        type: "success", 
        theme: "dark" 
      });
    } else {
      // Agregar nueva versión
      const newVersion = {
        id: Date.now(),
        ...formData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setVersionsList([...versionsList, newVersion]);
      showToast({ 
        message: "Nueva versión agregada correctamente", 
        type: "success", 
        theme: "dark" 
      });
    }

    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ equipmentCode: "", softwareName: "", currentVersion: "" });
    setEditingIndex(null);
  };

  const updateFormField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="versiones-container">
      <GlobalToastContainer />
      <div className="versiones-card">
        <div className="versiones-header">
          <BackButton onBack={onBack} />
          <h2 className="versiones-title">Versiones de Software</h2>
          <button className="add-version-btn" onClick={openAddModal}>
            <FaPlus />
            Agregar versión
          </button>
        </div>

        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar por equipo, software o versión..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-wrapper">
          <table className="versions-table">
            <thead>
              <tr>
                <th>Equipo</th>
                <th>Software</th>
                <th>Versión</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredVersions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-state">
                    <h3>No hay versiones registradas</h3>
                    <p>
                      {searchTerm 
                        ? "No se encontraron versiones que coincidan con tu búsqueda"
                        : "Comienza agregando una nueva versión de software"
                      }
                    </p>
                  </td>
                </tr>
              ) : (
                filteredVersions.map((version, index) => (
                  <tr key={version.id || index}>
                    <td>{version.equipmentCode}</td>
                    <td>{version.softwareName}</td>
                    <td>{version.currentVersion}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="edit-btn" 
                          onClick={() => openEditModal(index)} 
                          title="Editar versión"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="delete-btn" 
                          onClick={() => deleteVersion(index)} 
                          title="Eliminar versión"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="version-modal-overlay">
            <div className="version-modal">
              <div className="version-modal-header">
                <h3 className="version-modal-title">
                  {editingIndex !== null ? "Editar versión" : "Agregar nueva versión"}
                </h3>
                <button 
                  className="version-modal-close" 
                  onClick={closeModal}
                  aria-label="Cerrar modal"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="version-modal-body">
                  <div className="form-group">
                    <label className="form-label" htmlFor="equipmentCode">
                      Código de Equipo:
                    </label>
                    <input
                      id="equipmentCode"
                      type="text"
                      className="form-input"
                      value={formData.equipmentCode}
                      onChange={(e) => updateFormField('equipmentCode', e.target.value)}
                      placeholder="Ej: PC-001"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="softwareName">
                      Nombre del Software:
                    </label>
                    <input
                      id="softwareName"
                      type="text"
                      className="form-input"
                      value={formData.softwareName}
                      onChange={(e) => updateFormField('softwareName', e.target.value)}
                      placeholder="Ej: Windows 10 Pro"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="currentVersion">
                      Versión:
                    </label>
                    <input
                      id="currentVersion"
                      type="text"
                      className="form-input"
                      value={formData.currentVersion}
                      onChange={(e) => updateFormField('currentVersion', e.target.value)}
                      placeholder="Ej: 21H2"
                      required
                    />
                  </div>
                </div>

                <div className="version-modal-footer">
                  <button 
                    type="submit" 
                    className="save-btn"
                    disabled={!formData.equipmentCode.trim() || !formData.softwareName.trim() || !formData.currentVersion.trim()}
                  >
                    {editingIndex !== null ? "Guardar cambios" : "Agregar versión"}
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn" 
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersionesView;
