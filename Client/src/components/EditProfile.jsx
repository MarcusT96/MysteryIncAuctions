import React from 'react';

// En funktionell komponent för att redigera användarens profilinformation.
function EditProfile({ userInfo, handleInputChange, handleSubmit }) {

  // Renderar ett formulär som tillåter användaren att uppdatera sina uppgifter.
  return (
    <form onSubmit={handleSubmit} className="profile-page-form">
      <h2>Ändra Mina Uppgifter</h2>
      <div className="profile-page-form-group">
        <label>E-post</label>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleInputChange}
          placeholder="Din email"
        />
      </div>
      <div className="profile-page-form-group">
        <label>Lösenord</label>
        <input
          type="text"
          name="password"
          value={userInfo.password}
          onChange={handleInputChange}
          placeholder="Ditt lösenord"
        />
      </div>
      <div className="profile-page-form-group">
        <label>Förnamn</label>
        <input
          type="text"
          name="firstName"
          value={userInfo.firstName}
          onChange={handleInputChange}
          placeholder="Ditt förnamn"
        />
      </div>
      <div className="profile-page-form-group">
        <label>Efternamn</label>
        <input
          type="text"
          name="lastName"
          value={userInfo.lastName}
          onChange={handleInputChange}
          placeholder="Ditt efternamn"
        />
      </div>
      <div className="profile-page-form-group">
        <label>Adress</label>
        <input
          type="text"
          name="address"
          value={userInfo.address}
          onChange={handleInputChange}
          placeholder="Din adress"
        />
      </div>
      <div className="profile-page-form-group">
        <label>Stad</label>
        <input
          type="text"
          name="city"
          value={userInfo.city}
          onChange={handleInputChange}
          placeholder="Din stad"
        />
      </div>
      <div className="profile-page-form-group">
        <label>Postnummer</label>
        <input
          type="text"
          name="zipCode"
          value={userInfo.zipCode}
          onChange={handleInputChange}
          placeholder="Ditt postnummer"
        />
      </div>
      <div className="profile-page-form-group">
        <label>Telefonnummer</label>
        <input
          type="text"
          name="phone"
          value={userInfo.phone}
          onChange={handleInputChange}
          placeholder="Ditt telefonnummer"
        />
      </div>
      <button type="submit" className="profile-page-button">Spara Ändringar</button>
      {/* En knapp för att skicka formuläret. När den klickas på anropas handleSubmit-funktionen. */}

    </form>
  );
}

export default EditProfile;
