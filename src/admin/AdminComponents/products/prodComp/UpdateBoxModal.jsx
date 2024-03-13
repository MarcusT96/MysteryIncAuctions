import React, { useState, useEffect, useRef } from 'react';
import './prodComp.css';

function UpdateBoxModal({ box, onUpdate, onClose, categories }) {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const findCategoryIdByName = (categoryName) => {
        const categoryObj = categories.find(cat => cat.categoryName === categoryName);
        return categoryObj ? categoryObj.id : null;
    };

    useEffect(() => {
        setName(box.name);
        setWeight(box.weight);
        setPrice(box.price);
        setTime(box.time ? new Date(box.time).toISOString().slice(0, 16) : "");
        setDescription(box.description);
        setCategory(box.category);
        setImagePreview(box.image || null);
    }, [box]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const validateForm = () => {
        if (!name || !weight || !price || !time || !description || !category) {
            setError('All fields must be filled.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setError('');
        setIsLoading(true);

        const updatedBoxData = {
            name,
            weight,
            price,
            time: new Date(time).toISOString(),
            description,
            category,
            image: fileInputRef.current && fileInputRef.current.files.length > 0 ? imagePreview : box.image,
        };

        try {
            await onUpdate(box.id, updatedBoxData);
            onClose();
        } catch (error) {
            console.error('Error updating box:', error);
            setError('Failed to update the box. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app_prodcomp-modal">
            <div className="app_prodcomp-modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                {error && <p className="errorMessage">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="app_prodcomp-name">Namn:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="app_prodcomp-weight">Vikt (kg):</label>
                    <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />

                    <label htmlFor="app_prodcomp-price">Pris:</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />

                    <label htmlFor="app_prodcomp-time">Utgångs Datum:</label>
                    <input type="datetime-local" id="time" value={time} onChange={(e) => setTime(e.target.value)} />

                    <label htmlFor="app_prodcomp-description">Beskrivning:</label>
                    <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

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


                    <label htmlFor="app_prodcomp-image">Updatera bild:</label>
                    <input type="file" id="image" ref={fileInputRef} accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />}

                    <button type="submit" className="app_prodcomp-update-btn" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Update Box'}
                    </button>
                    <button type="button" className="app_prodcomp-cancel-btn" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateBoxModal;
