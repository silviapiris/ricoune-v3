CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(50),
  type_evenement VARCHAR(255),
  date_souhaitee VARCHAR(50),
  ville VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lu BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_contact_email ON contact_messages(email);
CREATE INDEX idx_contact_created ON contact_messages(created_at);

CREATE TABLE IF NOT EXISTS devis_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(50),
  type_evenement VARCHAR(255),
  date_souhaitee VARCHAR(50),
  lieu VARCHAR(255),
  formule VARCHAR(255),
  message TEXT,
  status ENUM('nouveau', 'en_cours', 'traite', 'refuse') DEFAULT 'nouveau',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_devis_email ON devis_requests(email);
CREATE INDEX idx_devis_status ON devis_requests(status);
CREATE INDEX idx_devis_created ON devis_requests(created_at);
