import { useState } from 'react'
import Airtable from 'airtable'
import flowerLogo from './assets/wildflower.svg'
import fallbackImage from './assets/flowernotfound.png'
import './App.css'

const records = await fetch('/api/flowers')
  .then(r => r.json())

console.log(records)

function FlowerCard({ title, image, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img
        src={image || fallbackImage}
        alt={title}
        className="card-img"
      />
      <h3>{title}</h3>
    </div>
  )
}

function FlowerResult({ flower, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img
        src={flower.fields.link_to_photo || fallbackImage}
        className="card-img"
      />

      <h3>{flower.fields.common_name}</h3>

      <p>
        <em>{flower.fields.genus} {flower.fields.species}</em>
      </p>
    </div>
  )
}

function FlowerFocus({ flower, onClose }) {
  return (
    <div className="card flower-focus" onClick={onClose}>
      <img
        src={flower.fields.link_to_photo || fallbackImage}
        className="card-img large"
      />

      <h3>{flower.fields.common_name}</h3>

      <p>
        <em>{flower.fields.genus} {flower.fields.species}</em>
      </p>

      <p>
        <b>Family: </b>{flower.fields.family}
      </p>

      <p>
        <b>Type: </b>{flower.fields.Type}
      </p>

      <p>
        <b>Petals: </b>{flower.fields.petals}
      </p>
        
      <p>
        <b>Visible during: </b>{flower.fields.when_visible}
      </p>

      <p>
        <b>Habitat: </b>{flower.fields.habitat}
      </p>

      <p>
        <b>Description: </b>{flower.fields.notes}
      </p>

    </div>
  )
}

function App() {
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedFlower, setSelectedFlower] = useState(null)

  const flowers = selectedColor
    ? records.filter(record =>
        record.fields.Flower_color?.some(
          color =>
            color.toLowerCase() ===
            selectedColor.toLowerCase()
        )
      )
    : []

  return (
    <div className="app">

      {!selectedColor && (
        <header className="hero">
          <h2>Viewpoint Trail Wildflowers</h2>
          <img src={flowerLogo} alt="Flower" className="hero-img"/>
          <p>
            A community-created field guide to wildflowers observed around Viewpoint Trail in Boulder, Colorado.
            Browse flowers by color. Images and description provided by Harold Eylima with assistance from Kiran Eylima.
          </p>
        </header>
      )}

      {selectedColor && (
        <header className="hero">
          <h2>
            Select flowers for additional description
          </h2>
        </header>
      )}

      {!selectedColor && (
        <section className="card-grid">
        <FlowerCard
          title="Green Flowers"
          image="https://inaturalist-open-data.s3.amazonaws.com/photos/426614055/large.jpeg"
          onClick={() => setSelectedColor('green')}
        />
        <FlowerCard
          title="Red Flowers"
          onClick={() => setSelectedColor('red')}
        />
        <FlowerCard
          title="Blue Flowers"
          onClick={() => setSelectedColor('blue')}
        />
        <FlowerCard
          title="White Flowers"
          image="https://inaturalist-open-data.s3.amazonaws.com/photos/664438368/large.jpg"
          onClick={() => setSelectedColor('white')}
        />
        <FlowerCard
          title="Yellow Flowers"
          image="https://inaturalist-open-data.s3.amazonaws.com/photos/426592001/large.jpeg"
          onClick={() => setSelectedColor('yellow')}
        />
        <FlowerCard
          title="Pink Flowers"
          image="https://inaturalist-open-data.s3.amazonaws.com/photos/664425753/large.jpg"
          onClick={() => setSelectedColor('pink')}
        />
        <FlowerCard
          title="Purple Flowers"
          image="https://inaturalist-open-data.s3.amazonaws.com/photos/664425753/large.jpg"
          onClick={() => setSelectedColor('purple')}
        />

        </section>
      )}

      {selectedFlower ? (
        <div className="focus-container">
          <button
            className="button"
            onClick={() => setSelectedFlower(null)}
          >
            ← Back
          </button>

          <FlowerFocus
            flower={selectedFlower}
            onClose={() => setSelectedFlower(null)}
          />
        </div>
      ) : selectedColor ? (
        <>
          <button
            className="button"
            onClick={() => setSelectedColor(null)}
          >
            ← Back to Colors
          </button>

          <section className="card-grid">
            {flowers.map(flower => (
              <FlowerResult
                key={flower.id}
                flower={flower}
                onClick={() => setSelectedFlower(flower)}
              />
            ))}
          </section>
        </>
      ) : null}

      {/* FOOTER / LINKS */}
      <footer className="footer">
        <img src={flowerLogo} alt="Flower" />
      </footer>

    </div>
  )
}

export default App
