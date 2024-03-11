import React, { useState, useEffect } from 'react';
import '../users/Users.css';
import { FaUserShield } from "react-icons/fa";
import { CiUnlock } from "react-icons/ci";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const usersPerPage = 10;

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const sortedAndFilteredUsers = users
        .filter(user => {
            const idString = user.id.toString();
            const isAdminString = user.isAdmin ? "admin" : "kund";
            return user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                idString.includes(searchQuery) ||
                isAdminString.includes(searchQuery.toLowerCase());
        })
        .sort((a, b) => {
            if (sortField === 'åtkomst') {
                return (a.isAdmin === b.isAdmin) ? 0 : a.isAdmin ? (sortOrder === 'asc' ? -1 : 1) : (sortOrder === 'asc' ? 1 : -1);
            }
            const fieldA = sortField === 'name' ? `${a.firstName} ${a.lastName}` : a[sortField];
            const fieldB = sortField === 'name' ? `${b.firstName} ${b.lastName}` : b[sortField];
            return sortOrder === 'asc' ? (fieldA > fieldB ? 1 : -1) : (fieldA < fieldB ? 1 : -1);
        });

    const handlePageChange = pageNumber => setCurrentPage(pageNumber);
    const handleSearchChange = e => setSearchQuery(e.target.value);
    const handleSortChange = e => setSortField(e.target.value);
    const handleSortOrderChange = order => setSortOrder(order);

    return (
        <div className='app__users-container'>
            <h2 className='app__users-title'>Användare</h2>
            <div>
                <input type="text" className="app__users-search" placeholder="Sök användare..." value={searchQuery} onChange={handleSearchChange} />
                <div className='app__users-filters-group'>
                    <select className='app__users-filters' value={sortField} onChange={handleSortChange}>
                        <option value="id">ID</option>
                        <option value="name">Namn</option>
                        <option value="åtkomst">Åtkomst</option>
                    </select>
                    <button className='app__users-buttons' onClick={() => handleSortOrderChange('asc')}>↟</button>
                    <button className='app__users-buttons' onClick={() => handleSortOrderChange('desc')}>↡</button>
                </div>
            </div>
            <UsersTable users={sortedAndFilteredUsers} />
            <Pagination currentPage={currentPage} usersPerPage={usersPerPage} totalUsers={users.length} paginate={handlePageChange} />
        </div>
    );
};

const UsersTable = ({ users }) => (
    <table className='app__users-table'>
        <thead className='app__users-thead'>
            <tr className='app__users-tr'>
                <th className='app__users-th'>ID</th>
                <th className='app__users-th'>Namn</th>
                <th className='app__users-th'>Tel</th>
                <th className='app__users-th'>Email</th>
                <th className='app__users-th'>Åtkomst</th>
            </tr>
        </thead>
        <tbody className='app__users-tbody'>
            {users.map(user => (
                <tr key={user.id}>
                    <td className='app__users-td'>{user.id}</td>
                    <td className='app__users-td'>{`${user.firstName} ${user.lastName}`}</td>
                    <td className='app__users-td'>{user.phone}</td>
                    <td className='app__users-td'>{user.email}</td>
                    <td className='app__users-td'>
                        {user.isAdmin ? (
                            <span className='app__users-admin'><FaUserShield /> Admin</span>
                        ) : (
                            <span className='app__users-customer'><CiUnlock /> Kund</span>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const Pagination = ({ currentPage, usersPerPage, totalUsers, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
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

export default Users;