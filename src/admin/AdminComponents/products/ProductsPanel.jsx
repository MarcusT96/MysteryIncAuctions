import React, { useState, useEffect } from 'react';
import './ProductsPanel.css';
import CountdownTimer from '../../../components/CountDownTimer';
import AddBoxForm from './prodComp/AddBoxForm';
import UpdateBoxModal from './prodComp/UpdateBoxModal';

const ProductsPanel = () => {
    const [mysteryBoxes, setMysteryBoxes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddBoxModal, setShowAddBoxModal] = useState(false);
    const [showUpdateBoxModal, setShowUpdateBoxModal] = useState(false);
    const [currentBox, setCurrentBox] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/mystery_boxes');
            const data = await response.json();
            setMysteryBoxes(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddBox = async (box) => {
        try {
            await fetch('http://localhost:3000/mystery_boxes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(box),
            });
            alert(`Mysterielådan "${box.name}" har skapats!`);
            await fetchProducts();
        } catch (error) {
            console.error('Error adding box:', error);
        } finally {
            setShowAddBoxModal(false);
        }
    };

    const handleUpdateBox = async (id, updatedBox) => {
        try {
            const response = await fetch(`http://localhost:3000/mystery_boxes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBox),
            });
            if (!response.ok) {
                throw new Error(`Failed to update: ${response.statusText}`);
            }
            alert(`Mysterielådan "${updatedBox.name}" har uppdaterats!`);
            await fetchProducts();
        } catch (error) {
            console.error('Error updating box:', error);
        }
    };

    const openUpdateModal = (box) => {
        setCurrentBox(box);
        setShowUpdateBoxModal(true);
    };

    const deleteBox = async (id) => {
        try {
            await fetch(`http://localhost:3000/mystery_boxes/${id}`, { method: 'DELETE' });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting box:', error);
        }
    };

}

export default ProductsPanel;