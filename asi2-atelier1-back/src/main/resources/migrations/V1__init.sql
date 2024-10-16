CREATE TABLE card_model
(
    id            bigserial primary key,
    name          VARCHAR(255),
    description   VARCHAR(255),
    family        VARCHAR(255),
    affinity      VARCHAR(255),
    img_url       VARCHAR(255),
    small_img_url VARCHAR(255),
    energy        FLOAT   NOT NULL,
    hp            FLOAT   NOT NULL,
    defence       FLOAT   NOT NULL,
    attack        FLOAT   NOT NULL,
    price         FLOAT   NOT NULL,
    user_id       INTEGER,
    store_id      INTEGER
);

CREATE TABLE card_reference
(
    id            bigserial primary key,
    name          VARCHAR(255),
    description   VARCHAR(255),
    family        VARCHAR(255),
    affinity      VARCHAR(255),
    img_url       VARCHAR(255),
    small_img_url VARCHAR(255)
);

CREATE TABLE store_transaction
(
    id       bigserial primary key,
    user_id  INTEGER,
    card_id  INTEGER,
    store_id INTEGER,
    amount   FLOAT   NOT NULL,
    action   SMALLINT,
    time_st  TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE user_model
(
    id        bigserial primary key,
    login     VARCHAR(255),
    pwd       VARCHAR(255),
    account   FLOAT   NOT NULL,
    last_name VARCHAR(255),
    sur_name  VARCHAR(255),
    email     VARCHAR(255)
);

ALTER TABLE card_model
    ADD CONSTRAINT FK_CARDMODEL_ON_STORE FOREIGN KEY (store_id) REFERENCES store_transaction (id);

ALTER TABLE card_model
    ADD CONSTRAINT FK_CARDMODEL_ON_USER FOREIGN KEY (user_id) REFERENCES user_model (id);