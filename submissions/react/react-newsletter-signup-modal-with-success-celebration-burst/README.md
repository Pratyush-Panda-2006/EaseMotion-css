# Newsletter Signup Modal with Success Celebration Burst

A modular, copy-paste ready React component that renders a newsletter subscription modal. It leverages React hooks to manage form submission states (idle, loading, success) and triggers an animated confetti particle burst using CSS transitions upon successful subscription.

---

## 📦 Installation

This component has zero external dependencies outside React and standard EaseMotion CSS libraries.

1. Copy [NewsletterSignupModal.jsx](./NewsletterSignupModal.jsx) into your React component directory.
2. Link the core EaseMotion CSS stylesheet inside your application entry file (e.g. `App.js` or `main.js`):

```javascript
import 'ease-motion-css/easemotion.css';
```

---

## 🚀 Usage Example

```jsx
import React, { useState } from 'react';
import NewsletterSignupModal from './NewsletterSignupModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="container" style={{ padding: '3rem', backgroundColor: '#030712', minHeight: '100vh', textAlign: 'center' }}>
      <h2 style={{ color: '#fff', marginBottom: '2.5rem' }}>Join the EaseMotion Community</h2>
      
      <button 
        onClick={() => setModalOpen(true)}
        style={{
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          backgroundColor: '#8b5cf6',
          color: '#fff',
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Sign Up Now
      </button>

      <NewsletterSignupModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Stay Animated!"
        description="Receive the latest CSS animations tips directly to your inbox."
        accentColor="#8b5cf6" 
      />
    </div>
  );
}
```

---

## ⚙️ Props Specifications

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isOpen` | `boolean` | *Required* | Controls the visibility state of the modal. |
| `onClose` | `Function` | *Required* | Callback function executed when closing the modal window. |
| `title` | `string` | `'Join Our Newsletter'` | Header text displayed inside the modal. |
| `description` | `string` | *See default* | Explanatory subtext detailing newsletter benefits. |
| `buttonText` | `string` | `'Subscribe'` | Text label inside the CTA button. |
| `accentColor` | `string` | `'#8b5cf6'` | Accent color used for the button background. |
