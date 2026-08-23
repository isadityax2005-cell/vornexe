import React, { useState, useEffect } from 'react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('vornexe_admin_token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setMessages(data);
      }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleReplySubmit = async (msgId) => {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      const token = localStorage.getItem('vornexe_admin_token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/messages/${msgId}/reply`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ replyText })
      });
      if (res.ok) {
        setReplyText('');
        setReplyingTo(null);
        fetchMessages(); // Refresh list to update status
      } else {
        alert('Failed to send reply');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending reply');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading inquiries...</div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1>INQUIRIES</h1>
      </div>
      
      {messages.length === 0 ? (
        <div style={{ padding: '4rem', textAlign: 'center', border: '1px dashed var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>NO INQUIRIES YET.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ 
              padding: '2rem', 
              backgroundColor: '#0a0a0a',
              border: '1px solid var(--border-color)',
              borderLeft: msg.status === 'Pending' ? '4px solid #ff3333' : '4px solid #33ff33'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{msg.email}</a>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    border: '1px solid var(--text-secondary)', 
                    color: msg.status === 'Pending' ? '#ff3333' : '#33ff33',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase'
                  }}>
                    {msg.status}
                  </span>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div style={{ 
                padding: '1.5rem', 
                backgroundColor: '#111', 
                border: '1px solid #222',
                borderRadius: '4px',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                {msg.message}
              </div>

              {msg.status === 'Pending' && replyingTo !== msg.id && (
                <button 
                  onClick={() => setReplyingTo(msg.id)}
                  className="admin-primary-btn"
                  style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}
                >
                  REPLY VIA EMAIL
                </button>
              )}

              {replyingTo === msg.id && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                  <textarea 
                    rows="6"
                    style={{ 
                      width: '100%', 
                      background: 'transparent',
                      border: '1px solid #444',
                      color: 'var(--text-primary)',
                      padding: '1rem',
                      fontFamily: 'inherit',
                      marginBottom: '1rem'
                    }}
                    placeholder={`Type your reply to ${msg.name}... (This will be emailed to them)`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                      onClick={() => handleReplySubmit(msg.id)}
                      className="admin-primary-btn"
                      style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}
                      disabled={sending}
                    >
                      {sending ? 'SENDING...' : 'SEND EMAIL'}
                    </button>
                    <button 
                      onClick={() => { setReplyingTo(null); setReplyText(''); }}
                      style={{ 
                        background: 'transparent',
                        border: '1px solid #444',
                        color: 'var(--text-secondary)',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer'
                      }}
                      disabled={sending}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
