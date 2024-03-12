import React, { useState } from 'react';
import './prodComp.css'

function AddBoxForm({ onAdd, onClose }) {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [formError, setFormError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBoxData = {
            name,
            weight,
            price,
            time,
            description,
            category,
            image
        };

        onAdd(newBoxData);
        onClose();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                setImage(base64String);
                setPreviewUrl(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="app_prodcomp-modal">
            <div className="app_prodcomp-modal-content">
                <form onSubmit={handleSubmit}>
                    <div>
                        {previewUrl && (
                            <div style={{ display: "flex", justifyContent: "center", maxWidth: "100%" }}>
                                <img src={previewUrl} alt="Preview" style={{ maxWidth: "30%", height: "auto" }} />
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
                    <input
                        placeholder='Kategori nummer...'
                        type="number"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <label htmlFor="app_prodcomp-image">Lägg till bild:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <button className='app_prodcomp-add-btn' type="submit">Add Box</button>
                    <button className='app_prodcomp-close-btn' type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default AddBoxForm;