import React from "react";

const [equipment, setEquipment] = useState([]);
const [isEditing, setIsEditing] = useState(false);
const [equipmentId, setEquipmentId] = useState(null);

useEffect(() => {
  getAllEquipment().then((data) => setEquipment(data));
}, []);

const handleEdit = () => {
  setIsEditing(true);
  setEquipmentId(equipment.id);
};

const handleCancel = () => {
  setIsEditing(false);
};

const handleSave = () => {
  const newEquipment = {
    ...equipment,
    name: e.name,
    description: e.description,
    rentalPrice: e.rentalPrice,
    availability: e.availability,
  };
  editEquipment(newEquipment).then((data) => {
    setEquipment(data);
    setIsEditing(false);
  });
};

const handleDelete = () => {
  deleteEquipment(equipment.id).then(() => {
    setEquipment(equipment.filter((e) => e.id !== equipment.id));
  });
};

export default function Equipment() {
  if (!isEditing) {
    return (
      <div>
        <h1>Equipment Page</h1>
        <ul>
          {equipment.map((e) => (
            <li key={e.id}>
              {e.name}
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Edit Equipment</h1>
        <form>
          <input
            name="name"
            value={equipment.name}
            onChange={(e) =>
              setEquipment({ ...equipment, name: e.target.value })
            }
          />
          <input
            name="description"
            value={equipment.description}
            onChange={(e) =>
              setEquipment({ ...equipment, description: e.target.value })
            }
          />
          <input
            name="rentalPrice"
            value={equipment.rentalPrice}
            onChange={(e) =>
              setEquipment({ ...equipment, rentalPrice: e.target.value })
            }
          />
          <input
            name="availability"
            value={equipment.availability}
            onChange={(e) =>
              setEquipment({ ...equipment, availability: e.target.value })
            }
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}
