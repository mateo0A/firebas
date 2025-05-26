import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase/firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

function App() {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    edad: '',
    telefono: '',
    representanteNombre: '',
    representanteApellido: '',
    representanteTelefono: '',
    parentesco: '',
    curso: '',
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [editId, setEditId] = useState(null);

  const cursos = [
    'Octavo A', 'Octavo B',
    'Noveno A', 'Noveno B',
    'Décimo A', 'Décimo B'
  ];

  // Guardar nuevo estudiante en subcolección por curso
  const handleGuardar = async () => {
    if (editId) return;
    await addDoc(collection(db, `estudiantes/${form.curso}/alumnos`), form);
    setForm({
      nombres: '', apellidos: '', edad: '', telefono: '', representanteNombre: '', representanteApellido: '', representanteTelefono: '', parentesco: '', curso: '',
    });
    fetchEstudiantesPorCurso();
  };

  // Obtener estudiantes por curso
  const fetchEstudiantesPorCurso = async () => {
    let all = [];
    for (const curso of cursos) {
      const querySnapshot = await getDocs(collection(db, `estudiantes/${curso}/alumnos`));
      const alumnos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), curso }));
      all = all.concat(alumnos);
    }
    setEstudiantes(all);
  };

  // Cargar estudiantes al iniciar
  useEffect(() => {
    fetchEstudiantesPorCurso();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Editar estudiante (cargar datos al formulario)
  const handleEditar = (est) => {
    setForm({ ...est });
    setEditId(est.id);
  };

  // Guardar cambios de edición
  const handleActualizar = async () => {
    if (!editId || !form.curso) return;
    const ref = doc(db, `estudiantes/${form.curso}/alumnos`, editId);
    await updateDoc(ref, form);
    setEditId(null);
    setForm({
      nombres: '', apellidos: '', edad: '', telefono: '', representanteNombre: '', representanteApellido: '', representanteTelefono: '', parentesco: '', curso: '',
    });
    fetchEstudiantesPorCurso();
  };

  return (
    <>
      <div className="form-container" style={{ maxWidth: 500, margin: '40px auto', padding: 24, borderRadius: 12 }}>
        <h2>Ingreso de Estudiantes</h2>
        <form onSubmit={e => e.preventDefault()}>
          <label>Nombres:
            <input type="text" name="nombres" value={form.nombres} onChange={handleChange} required />
          </label><br />
          <label>Apellidos:
            <input type="text" name="apellidos" value={form.apellidos} onChange={handleChange} required />
          </label><br />
          <label>Edad:
            <input type="number" name="edad" value={form.edad} onChange={handleChange} required />
          </label><br />
          <label>Teléfono:
            <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required />
          </label><br />
          <label>Nombre del representante:
            <input type="text" name="representanteNombre" value={form.representanteNombre} onChange={handleChange} required />
          </label><br />
          <label>Apellido del representante:
            <input type="text" name="representanteApellido" value={form.representanteApellido} onChange={handleChange} required />
          </label><br />
          <label>Teléfono del representante:
            <input type="tel" name="representanteTelefono" value={form.representanteTelefono} onChange={handleChange} required />
          </label><br />
          <label>Parentesco:
            <input type="text" name="parentesco" value={form.parentesco} onChange={handleChange} required />
          </label><br />
          <label>Curso:
            <select name="curso" value={form.curso} onChange={handleChange} required>
              <option value="">Seleccione un curso</option>
              {cursos.map((curso) => (
                <option key={curso} value={curso}>{curso}</option>
              ))}
            </select>
          </label><br /><br />
          <button type="button" onClick={editId ? handleActualizar : handleGuardar}>
            {editId ? 'Actualizar' : 'Guardar'}
          </button>
        </form>
      </div>
      <div style={{ maxWidth: 600, margin: '40px auto' }}>
        <h3>Lista de Estudiantes por Curso</h3>
        {cursos.map(curso => (
          <div key={curso} style={{ marginBottom: 32 }}>
            <h4>{curso}</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Edad</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.filter(est => est.curso === curso).map(est => (
                  <tr key={est.id}>
                    <td>{est.nombres}</td>
                    <td>{est.apellidos}</td>
                    <td>{est.edad}</td>
                    <td>{est.telefono}</td>
                    <td>
                      <button onClick={() => handleEditar(est)}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
