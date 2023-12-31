PGDMP                         {         	   goodreads    15.2 (Debian 15.2-1.pgdg110+1)    15.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    152571 	   goodreads    DATABASE     t   CREATE DATABASE goodreads WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE goodreads;
                postgres    false            J           1247    152573    enum_Libraries_collection    TYPE     z   CREATE TYPE public."enum_Libraries_collection" AS ENUM (
    'WANT_TO_READ',
    'READING',
    'READ',
    'FINISHED'
);
 .   DROP TYPE public."enum_Libraries_collection";
       public          postgres    false            �            1259    152581    Books    TABLE     P  CREATE TABLE public."Books" (
    id integer NOT NULL,
    title character varying(255),
    author character varying(255),
    date character varying(255),
    cover_image character varying(255),
    rating character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Books";
       public         heap    postgres    false            �            1259    152586    Books_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Books_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Books_id_seq";
       public          postgres    false    214                       0    0    Books_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Books_id_seq" OWNED BY public."Books".id;
          public          postgres    false    215            �            1259    152587 	   Libraries    TABLE     ,  CREATE TABLE public."Libraries" (
    id integer NOT NULL,
    finished boolean,
    rating integer,
    collection public."enum_Libraries_collection",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "BookId" integer,
    "UserId" integer
);
    DROP TABLE public."Libraries";
       public         heap    postgres    false    842            �            1259    152590    Libraries_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Libraries_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Libraries_id_seq";
       public          postgres    false    216                       0    0    Libraries_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Libraries_id_seq" OWNED BY public."Libraries".id;
          public          postgres    false    217            �            1259    152591    Users    TABLE       CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    152596    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    218                       0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    219            u           2604    152597    Books id    DEFAULT     h   ALTER TABLE ONLY public."Books" ALTER COLUMN id SET DEFAULT nextval('public."Books_id_seq"'::regclass);
 9   ALTER TABLE public."Books" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            v           2604    152598    Libraries id    DEFAULT     p   ALTER TABLE ONLY public."Libraries" ALTER COLUMN id SET DEFAULT nextval('public."Libraries_id_seq"'::regclass);
 =   ALTER TABLE public."Libraries" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            w           2604    152599    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218                      0    152581    Books 
   TABLE DATA           i   COPY public."Books" (id, title, author, date, cover_image, rating, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    214   /                  0    152587 	   Libraries 
   TABLE DATA           u   COPY public."Libraries" (id, finished, rating, collection, "createdAt", "updatedAt", "BookId", "UserId") FROM stdin;
    public          postgres    false    216   �!                 0    152591    Users 
   TABLE DATA           V   COPY public."Users" (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   Z"                  0    0    Books_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Books_id_seq"', 5, true);
          public          postgres    false    215                       0    0    Libraries_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Libraries_id_seq"', 10, true);
          public          postgres    false    217                       0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 2, true);
          public          postgres    false    219            y           2606    152601    Books Books_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Books"
    ADD CONSTRAINT "Books_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Books" DROP CONSTRAINT "Books_pkey";
       public            postgres    false    214            {           2606    152603    Libraries Libraries_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Libraries"
    ADD CONSTRAINT "Libraries_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Libraries" DROP CONSTRAINT "Libraries_pkey";
       public            postgres    false    216            }           2606    152605    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    218            ~           2606    152606    Libraries Libraries_BookId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Libraries"
    ADD CONSTRAINT "Libraries_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES public."Books"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public."Libraries" DROP CONSTRAINT "Libraries_BookId_fkey";
       public          postgres    false    3193    214    216                       2606    152611    Libraries Libraries_UserId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Libraries"
    ADD CONSTRAINT "Libraries_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public."Libraries" DROP CONSTRAINT "Libraries_UserId_fkey";
       public          postgres    false    3197    216    218               �  x����n!�3~����3,�n�Z%mUՉ-��٥Y\�.N�/��J��6�0��gj��1�v��vl�ڏ9H��:�pyJ��*�n	�'g�l�������޺ ��?���L��V(V�X��Y�Cjm�ӘM��k;�.��H� ŏ�_��
	H�������U�����K�Z�v��ܳg7���c_mt�=���%lc�ps��.2RTPo�H�z^&5\�Wd5G�L2b�����]���\�G7Eˮ���>�x�'_PZ�	�Nb����UD%opN�1��~�r!�>��S���=�<nӝ28|�4�?��S�- �6��۠,���$M��P�?P3��L�u)iU�,|�e�v)S5�"�7SD��V�zC��Ԃ�J�.��_,Q>��         �   x�u�;
�`�z���e��?;A��9���Ā�1���Tz�~9�o��b�=jO&���D	�Lr�K�d�xC۪f���WBZ����FӸ��܆K�o(/�k��B��mGy�oھ��Qʓ0�5�         �   x�}��n�@ ��Sx������S�nK*�Dڦ��B��n+>�&���2�9�0��en$YS���4?���k7&�b�RC&���ko2�.����~�����(�\ƇN����h��XHqhQnQ6`� wP���J�(��3��M��~ko�ʋ�p��Y���Ɓ]Η�+�����?+o�h���.I ;�>����?E>�r��Lz     