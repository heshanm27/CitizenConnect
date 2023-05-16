import React from "react";
const [customers, setCustomers] = useState([]);
const [isEditing, setIsEditing] = useState(false);
const [customerId, setCustomerId] = useState(null);

useEffect(() => {
  getAllCustomers().then((data) => setCustomers(data));
}, []);

const handleEdit = () => {
  setIsEditing(true);
  setCustomerId(customer.id);
};

const handleCancel = () => {
  setIsEditing(false);
};

const handleSave = () => {
  const newCustomer = {
    ...customer,
    name: e.name,
    address: e.address,
    phone: e.phone,
    rentedEquipment: e.rentedEquipment,
  };
  editCustomer(newCustomer).then((data) => {
    setCustomers(data);
    setIsEditing(false);
  });
};

const handleDelete = () => {
  deleteCustomer(customer.id).then(() => {
    setCustomers(customers.filter((c) => c.id !== customer.id));
  });
};

export default function Customer() {
  if (!isEditing) {
    return (
      <div>
        <h1>Customer Page</h1>
        <ul>
          {customers.map((c) => (
            <li key={c.id}>
              {c.name}
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
        <h1>Edit Customer</h1>
        <form>
          <input
            name="name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          <input
            name="address"
            value={customer.address}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />
          <input
            name="phone"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />
          <input
            name="rentedEquipment"
            value={customer.rentedEquipment}
            onChange={(e) =>
              setCustomer({ ...customer, rentedEquipment: e.target.value })
            }
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}


