import React, { useState, useEffect } from "react";
import "./Orders.css";

function Orders() {
    const [boughtBoxes, setBoughtBoxes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchBoughtBoxes = async () => {
            try {
                const response = await fetch('/api//bought_boxes');
                const data = await response.json();
                setBoughtBoxes(data.map(box => ({
                    ...box,
                    status: getStatusText(box)
                })));
            } catch (error) {
                console.error("Failed to fetch bought boxes:", error);
            }
        };

        fetchBoughtBoxes();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleSortChange = (e) => {
        setSortField(e.target.value);
    };

    const handleSortOrderChange = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const makeStyle = (box) => {
        if (box.paid && !box.delivered) {
            return "status-approved";
        } else if (box.paid && box.delivered) {
            return "status-delivered";
        } else {
            return "status-pending";
        }
    };

    const getStatusText = (box) => {
        if (box.paid && !box.delivered) {
            return "Godkänd";
        } else if (box.paid && box.delivered) {
            return "Levererad";
        } else {
            return "Väntande";
        }
    };

    const filteredAndSortedBoxes = boughtBoxes
        .filter((box) =>
            box.name.toLowerCase().includes(searchQuery) ||
            box.status.toLowerCase().includes(searchQuery)
        )
        .sort((a, b) => {
            let compareA = a[sortField];
            let compareB = b[sortField];
            if (sortField === "date") {
                compareA = new Date(compareA);
                compareB = new Date(compareB);
            }
            if (sortOrder === "asc") {
                return compareA < compareB ? -1 : 1;
            } else {
                return compareA > compareB ? -1 : 1;
            }
        });

    return (
        <div className="app__orders-container">
            <h2>Senaste beställningarna</h2>
            <input
                type="text"
                placeholder="Sök efter namn eller status..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="app__products-search"
            />
            <div className="app__orders-sort">
                <select value={sortField} onChange={handleSortChange} className='app__products-filters'>
                    <option value="">Sortera efter</option>
                    <option value="name">Namn</option>
                    <option value="price">Pris</option>
                    <option value="time">Datum</option>
                    <option value="status">Status</option>
                </select>
                <button className='app__products-buttons' onClick={() => handleSortOrderChange('asc')}>↟</button>
                <button className='app__products-buttons' onClick={() => handleSortOrderChange('desc')}>↡</button>
            </div>
            <table className="app__orders-table-container">
                <thead className="app__orders-thead">
                    <tr>
                        <th>Produkt</th>
                        <th>Pris</th>
                        <th>Datum</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedBoxes.map((box) => (
                        <tr key={box.id}>
                            <td>{box.name}</td>
                            <td>{box.price} kr</td>
                            <td>{new Date(box.time).toLocaleDateString('sv-SE')}</td>
                            <td>
                                <span className={`app__orders-status ${makeStyle(box)}`}>
                                    {getStatusText(box)}
                                </span>
                            </td>
                            <td className="app__orders-details">Detaljer</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;
