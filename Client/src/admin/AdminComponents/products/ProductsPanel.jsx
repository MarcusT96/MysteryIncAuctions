import React, { useState, useEffect } from 'react';
import './ProductsPanel.css';
import CountdownTimer from '../../../components/CountDownTimer';
import AddBoxForm from './prodComp/AddBoxForm';
import UpdateBoxModal from './prodComp/UpdateBoxModal';

const ProductsPanel = () => {
    const [mysteryBoxes, setMysteryBoxes] = useState([]);
    const [categories, setCategories] = useState([]);
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
            const response = await fetch('/api/mystery_boxes');
            const data = await response.json();
            setMysteryBoxes(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
        fetchProducts();
    }, []);

    const handleAddBox = async (box) => {
        try {
            await fetch('/api/mystery_boxes', {
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
            const response = await fetch(`/api/mystery_boxes/${id}`, {
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
            await fetch(`/api/mystery_boxes/${id}`, { method: 'DELETE' });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting box:', error);
        }
    };

    const sortedAndFilteredProducts = mysteryBoxes
        .filter(box => {
            const categorySearchMatch = searchQuery.toLowerCase().match(/^kategori (\d+)$/);
            if (categorySearchMatch) {
                return box.category === parseInt(categorySearchMatch[1], 10);
            } else {
                return box.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    box.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    box.price.toString().includes(searchQuery) ||
                    box.category.toString().includes(searchQuery);
            }
        })
        .sort((a, b) => {
            let valueA = sortField === 'time' ? new Date(a[sortField]) : a[sortField];
            let valueB = sortField === 'time' ? new Date(b[sortField]) : b[sortField];

            if (typeof valueA === 'string') valueA = valueA.toLowerCase();
            if (typeof valueB === 'string') valueB = valueB.toLowerCase();

            if (sortOrder === 'asc') {
                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            } else {
                return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
            }
        });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedAndFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleSearchChange = e => setSearchQuery(e.target.value);
    const handleSortChange = (e) => {
        setSortField(e.target.value);
    };
    const handleSortOrderChange = (order) => {
        setSortOrder(order);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className='app__products-container'>
            <h2 className='app__products-title'>Produkter</h2>
            <input type="text" className="app__products-search" placeholder="Sök produkter..." value={searchQuery} onChange={handleSearchChange} />
            <div className='app__products-filters-group'>
                <select className='app__products-filters' value={sortField} onChange={handleSortChange}>
                    <option value="id">ID</option>
                    <option value="name">Namn</option>
                    <option value="price">Pris</option>
                    <option value="category">Kategori</option>
                    <option value="time">Tid</option>
                </select>
                <button className='app__products-buttons' onClick={() => handleSortOrderChange('asc')}>↟</button>
                <button className='app__products-buttons' onClick={() => handleSortOrderChange('desc')}>↡</button>
            </div>
            <button className='app__product-add-btn' onClick={() => setShowAddBoxModal(true)}>Lägg till 🪄📦</button>
            <ProductList
                mysteryBoxes={currentProducts}
                deleteBox={deleteBox}
                openUpdateModal={openUpdateModal}
            />
            {showAddBoxModal &&
                <AddBoxForm onAdd={handleAddBox} categories={categories} onClose={() => setShowAddBoxModal(false)} />}
            {showUpdateBoxModal && currentBox && (
                <UpdateBoxModal box={currentBox} onUpdate={handleUpdateBox} categories={categories} onClose={() => setShowUpdateBoxModal(false)} />
            )}
            <Pagination
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                totalProducts={mysteryBoxes.length}
                paginate={handlePageChange}
            />
        </div>
    );
};

function ProductList({ mysteryBoxes, deleteBox, openUpdateModal }) {
    return (
        <div className='app__products-boxdetail'>
            {mysteryBoxes.map(box => (
                <ProductRow key={box.id} box={box} deleteBox={deleteBox} openUpdateModal={openUpdateModal} />
            ))}
        </div>
    );
}

const Pagination = ({ currentPage, productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='app__user-pagination'>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>«</button>
            {pageNumbers.map(number => (
                <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
                    {number}
                </button>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>»</button>
        </div>
    );
};

function ProductRow({ box, deleteBox, openUpdateModal }) {
    return (
        <div className='app__product-row'>
            <div className='app__product-item'>{box.id}</div>
            <div className='app__product-item'>{box.name}</div>
            <div className='app__product-item'>{box.price}kr</div>
            <div className='app__product-item'>Kategori nr: {box.category}</div>
            <div className='app__product-item'><CountdownTimer endTime={box.time} /></div>
            <div className='app__product-item'>
                <button className='app__product-dt-btn' onClick={() => deleteBox(box.id)}>Ta Bort</button>
                <button className='app__product-up-btn' onClick={() => openUpdateModal(box)}>Redigera</button>
            </div>
        </div>
    );

}

export default ProductsPanel;