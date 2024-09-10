export default function Search() {
  return (
    <>
      <form>
        <label htmlFor="searchTerm"> Search by plant name:</label>
        <input id="searchTerm" type="text" />
        <button type="submit">Search</button>
      </form>
      <section>
        <label htmlFor="sort">Sort by:</label>
        <select>
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
          <option value="scientific-name">Scientific name</option>
          <option value="care">Care Level</option>
        </select>
        <label htmlFor="care-level">Care Level</label>
        <select id="care-level">
          <option value="">None</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Challenging">Challenging</option>
        </select>
        <label htmlFor="tags">Tags</label>
        <select id="tags">
          <option value="">None</option>
          <option value="Air Purifying">Air Purifying</option>
          <option value="Classic">Classic</option>
          <option value="Colorful">Colorful</option>
          <option value="Decorative">Decorative</option>
          <option value="Drought Tolerant">Drought Tolerant</option>
          <option value="Easy Care">Easy Care</option>
          <option value="Fast Growing">Fast Growing</option>
          <option value="Flowering">Flowering</option>
          <option value="Low Maintenance">Low Maintenance</option>
          <option value="Medicinal">Medicinal</option>
          <option value="No Soil">No Soil</option>
          <option value="Pet Friendly">Pet Friendly</option>
          <option value="Shade Tolerant">Shade Tolerant</option>
          <option value="Statement Plant">Statement Plant</option>
          <option value="Succulent">Succulent</option>
          <option value="Tropical">Tropical</option>
        </select>
      </section>
    </>
  );
}
