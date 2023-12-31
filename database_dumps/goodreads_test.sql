PGDMP                          {            goodreads_test    15.2 (Debian 15.2-1.pgdg110+1)    15.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    152520    goodreads_test    DATABASE     y   CREATE DATABASE goodreads_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE goodreads_test;
                postgres    false            K           1247    152522    enum_Libraries_collection    TYPE     z   CREATE TYPE public."enum_Libraries_collection" AS ENUM (
    'WANT_TO_READ',
    'READING',
    'READ',
    'FINISHED'
);
 .   DROP TYPE public."enum_Libraries_collection";
       public          postgres    false            �            1259    152531    Books    TABLE     P  CREATE TABLE public."Books" (
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
       public         heap    postgres    false            �            1259    152536    Books_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Books_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Books_id_seq";
       public          postgres    false    214            !           0    0    Books_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Books_id_seq" OWNED BY public."Books".id;
          public          postgres    false    215            �            1259    152537 	   Libraries    TABLE     ,  CREATE TABLE public."Libraries" (
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
       public         heap    postgres    false    843            �            1259    152540    Libraries_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Libraries_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Libraries_id_seq";
       public          postgres    false    216            "           0    0    Libraries_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Libraries_id_seq" OWNED BY public."Libraries".id;
          public          postgres    false    217            �            1259    152566    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    152541    Users    TABLE       CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    152546    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    218            #           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    219            y           2604    152547    Books id    DEFAULT     h   ALTER TABLE ONLY public."Books" ALTER COLUMN id SET DEFAULT nextval('public."Books_id_seq"'::regclass);
 9   ALTER TABLE public."Books" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            z           2604    152548    Libraries id    DEFAULT     p   ALTER TABLE ONLY public."Libraries" ALTER COLUMN id SET DEFAULT nextval('public."Libraries_id_seq"'::regclass);
 =   ALTER TABLE public."Libraries" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            {           2604    152549    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218                      0    152531    Books 
   TABLE DATA           i   COPY public."Books" (id, title, author, date, cover_image, rating, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    214   _#                 0    152537 	   Libraries 
   TABLE DATA           u   COPY public."Libraries" (id, finished, rating, collection, "createdAt", "updatedAt", "BookId", "UserId") FROM stdin;
    public          postgres    false    216   |#                 0    152566    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    220   $                 0    152541    Users 
   TABLE DATA           V   COPY public."Users" (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   Q$       $           0    0    Books_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Books_id_seq"', 5, true);
          public          postgres    false    215            %           0    0    Libraries_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Libraries_id_seq"', 4, true);
          public          postgres    false    217            &           0    0    Users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Users_id_seq"', 30, true);
          public          postgres    false    219            }           2606    152551    Books Books_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Books"
    ADD CONSTRAINT "Books_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Books" DROP CONSTRAINT "Books_pkey";
       public            postgres    false    214                       2606    152553    Libraries Libraries_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Libraries"
    ADD CONSTRAINT "Libraries_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Libraries" DROP CONSTRAINT "Libraries_pkey";
       public            postgres    false    216            �           2606    152570     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    220            �           2606    152555    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    218            �           2606    152556    Libraries Libraries_BookId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Libraries"
    ADD CONSTRAINT "Libraries_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES public."Books"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public."Libraries" DROP CONSTRAINT "Libraries_BookId_fkey";
       public          postgres    false    214    3197    216            �           2606    152561    Libraries Libraries_UserId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Libraries"
    ADD CONSTRAINT "Libraries_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public."Libraries" DROP CONSTRAINT "Libraries_UserId_fkey";
       public          postgres    false    218    216    3201                  x������ � �         �   x�u��
�0�s�ޥ�d�I��
�x� /�����������u�m`���b�ځ'2������V.��Vs���2��L��X�9���[�F!dl�?\�2T���o���{��];�P���>���&�b�� t�:D         2   x�320�401464323���M.JM,I�--N-��*�2202�#���� W��         �   x�}�;�@ �NaAg���:PY�&4�c06�0#���齁�}
��v�[g�*q�cW�%��U�X�Hϸ������,�Vd@� $hb+�1�J!�e���HX�����nxT����y�^��t��^����ݱ^��n��>����C�ٟ���#$��$t鐉��ʿ���� ��;     