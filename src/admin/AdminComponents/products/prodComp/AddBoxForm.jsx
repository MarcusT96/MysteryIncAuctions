import React, { useState } from 'react';
import './prodComp.css'

function AddBoxForm({ onAdd, onClose, categories }) {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [formError, setFormError] = useState('');

    const findCategoryIdByName = (categoryName) => {
        const categoryObj = categories.find(cat => cat.categoryName === categoryName);
        return categoryObj ? categoryObj.id : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageUrl) {
            setFormError('Please provide an image URL.');
            return;
        }

        const newBoxData = {
            name,
            weight,
            price,
            time,
            description,
            category: findCategoryIdByName(category),
            image: imageUrl
        };

        try {
            await onAdd(newBoxData);
            onClose();
        } catch (error) {
            console.error('Error adding box:', error);
            setFormError('An error occurred while adding the box.');
        }
    };

    return (
        <div className="app_prodcomp-modal">
            <div className="app_prodcomp-modal-content">
                <form onSubmit={handleSubmit}>
                    <div>
                        {imageUrl && (
                            <div style={{ display: "flex", justifyContent: "center", maxWidth: "100%" }}>
                                <img src={imageUrl} alt="Preview" style={{ maxWidth: "30%", height: "auto" }} />
                            </div>
                        )}
                        {formError && <div className="error">{formError}</div>}
                    </div>
                    <label htmlFor="app_prodcomp-name">Namn:</label>
                    <input
                        placeholder='Lägg till namn...'
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="app_prodcomp-weight">Vikt (kg):</label>
                    <input
                        placeholder='Lägg till vikt...'
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />

                    <label htmlFor="app_prodcomp-price">Pris:</label>
                    <input
                        placeholder='Lägg till pris...'
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <label htmlFor="app_prodcomp-time">Utgångs Datum:</label>
                    <input
                        type="datetime-local"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />

                    <label htmlFor="app_prodcomp-description">Beskrivning:</label>
                    <input
                        placeholder='Lägg till beskrivning...'
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label htmlFor="app_prodcomp-category">Kategori:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Välj en kategori</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                        ))}
                    </select>

                    <label htmlFor="app_prodcomp-image">Lägg till bild:</label>
                    <input
                        placeholder='Lägg till bild URL...'
                        type="text"
                        id="image"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />

                    <button className='app_prodcomp-add-btn' type="submit">Add Box</button>
                    <button className='app_prodcomp-close-btn' type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default AddBoxForm;