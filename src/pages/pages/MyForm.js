import { useState } from 'react';

const MyForm = () => {
  const [data, setData] = useState([
    { id: 1, closeStock: "10", openStock: "5" },
    { id: 2, closeStock: "20", openStock: "15" }
    // Add more data objects as needed
  ]);

  const [initialData, setInitialData] = useState([
    { id: 1, closeStock: "10", openStock: "5" },
    { id: 2, closeStock: "20", openStock: "15" }
    // Add more data objects as needed
  ]);

  const [changedData, setChangedData] = useState([]);

  const handleInputChange = (id, field, value) => {
    const updatedData = data.map(obj => {
      if (obj.id === id) {
        return { ...obj, [field]: value };
      }
      return obj;
    });

    setData(updatedData);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Filter only the changed data objects
    const changedDataObjects = data.filter(obj => {
      const initialObj = initialData.find(initial => initial.id === obj.id);
      return (
        initialObj.closeStock !== obj.closeStock ||
        initialObj.openStock !== obj.openStock
      );
    });

    // Log the changed data objects
    console.log('Changed Data:', changedDataObjects);
  };

  

  console.log('initialData Data:', initialData);


  return (
    <form onSubmit={handleSubmit}>
      {data.map(obj => (
        <div key={obj.id}>
          <label>Close Stock:</label>
          <input
            value={obj.closeStock}
            onChange={e =>
              handleInputChange(obj.id, 'closeStock', e.target.value)
            }
          />
          <label>Open Stock:</label>
          <input
            value={obj.openStock}
            onChange={e =>
              handleInputChange(obj.id, 'openStock', e.target.value)
            }
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
