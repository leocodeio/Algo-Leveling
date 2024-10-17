--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: ar_internal_metadata; Type: TABLE DATA; Schema: public; Owner: judge0
--

COPY public.ar_internal_metadata (key, value, created_at, updated_at) FROM stdin;
environment	production	2024-10-17 04:42:07.222296	2024-10-17 04:42:07.222296
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: judge0
--

COPY public.clients (id) FROM stdin;
\.


--
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: judge0
--

COPY public.languages (id, name, compile_cmd, run_cmd, source_file, is_archived) FROM stdin;
1	Bash (4.4)	\N	/usr/local/bash-4.4/bin/bash script.sh	script.sh	t
2	Bash (4.0)	\N	/usr/local/bash-4.0/bin/bash script.sh	script.sh	t
3	Basic (fbc 1.05.0)	/usr/local/fbc-1.05.0/bin/fbc %s main.bas	./main	main.bas	t
4	C (gcc 7.2.0)	/usr/local/gcc-7.2.0/bin/gcc %s main.c	./a.out	main.c	t
5	C (gcc 6.4.0)	/usr/local/gcc-6.4.0/bin/gcc %s main.c	./a.out	main.c	t
6	C (gcc 6.3.0)	/usr/local/gcc-6.3.0/bin/gcc %s main.c	./a.out	main.c	t
7	C (gcc 5.4.0)	/usr/local/gcc-5.4.0/bin/gcc %s main.c	./a.out	main.c	t
8	C (gcc 4.9.4)	/usr/local/gcc-4.9.4/bin/gcc %s main.c	./a.out	main.c	t
9	C (gcc 4.8.5)	/usr/local/gcc-4.8.5/bin/gcc %s main.c	./a.out	main.c	t
10	C++ (g++ 7.2.0)	/usr/local/gcc-7.2.0/bin/g++ %s main.cpp	LD_LIBRARY_PATH=/usr/local/gcc-7.2.0/lib64 ./a.out	main.cpp	t
11	C++ (g++ 6.4.0)	/usr/local/gcc-6.4.0/bin/g++ %s main.cpp	LD_LIBRARY_PATH=/usr/local/gcc-6.4.0/lib64 ./a.out	main.cpp	t
12	C++ (g++ 6.3.0)	/usr/local/gcc-6.3.0/bin/g++ %s main.cpp	LD_LIBRARY_PATH=/usr/local/gcc-6.3.0/lib64 ./a.out	main.cpp	t
13	C++ (g++ 5.4.0)	/usr/local/gcc-5.4.0/bin/g++ %s main.cpp	LD_LIBRARY_PATH=/usr/local/gcc-5.4.0/lib64 ./a.out	main.cpp	t
14	C++ (g++ 4.9.4)	/usr/local/gcc-4.9.4/bin/g++ %s main.cpp	LD_LIBRARY_PATH=/usr/local/gcc-4.9.4/lib64 ./a.out	main.cpp	t
15	C++ (g++ 4.8.5)	/usr/local/gcc-4.8.5/bin/g++ %s main.cpp	LD_LIBRARY_PATH=/usr/local/gcc-4.8.5/lib64 ./a.out	main.cpp	t
16	C# (mono 5.4.0.167)	/usr/local/mono-5.4.0.167/bin/mcs %s Main.cs	/usr/local/mono-5.4.0.167/bin/mono Main.exe	Main.cs	t
17	C# (mono 5.2.0.224)	/usr/local/mono-5.2.0.224/bin/mcs %s Main.cs	/usr/local/mono-5.2.0.224/bin/mono Main.exe	Main.cs	t
18	Clojure (1.8.0)	\N	/usr/bin/java -cp /usr/local/clojure-1.8.0/clojure-1.8.0.jar clojure.main main.clj	main.clj	t
19	Crystal (0.23.1)	/usr/local/crystal-0.23.1-3/bin/crystal build %s main.cr	./main	main.cr	t
20	Elixir (1.5.1)	\N	/usr/local/elixir-1.5.1/bin/elixir main.exs	main.exs	t
21	Erlang (OTP 20.0)	\N	/bin/sed -i "s/^/\\n/" main.erl && /usr/local/erlang-20.0/bin/escript main.erl	main.erl	t
22	Go (1.9)	/usr/local/go-1.9/bin/go build %s main.go	./main	main.go	t
23	Haskell (ghc 8.2.1)	/usr/local/ghc-8.2.1/bin/ghc %s main.hs	./main	main.hs	t
24	Haskell (ghc 8.0.2)	/usr/local/ghc-8.0.2/bin/ghc %s main.hs	./main	main.hs	t
25	Insect (5.0.0)	\N	/usr/local/insect-5.0.0/insect main.ins	main.ins	t
26	Java (OpenJDK 9 with Eclipse OpenJ9)	/usr/local/openjdk9-openj9/bin/javac %s Main.java	/usr/local/openjdk9-openj9/bin/java Main	Main.java	t
27	Java (OpenJDK 8)	/usr/lib/jvm/java-8-openjdk-amd64/bin/javac %s Main.java	/usr/lib/jvm/java-8-openjdk-amd64/bin/java Main	Main.java	t
28	Java (OpenJDK 7)	/usr/lib/jvm/java-7-openjdk-amd64/bin/javac %s Main.java	/usr/lib/jvm/java-7-openjdk-amd64/bin/java Main	Main.java	t
29	JavaScript (nodejs 8.5.0)	\N	/usr/local/node-8.5.0/bin/node main.js	main.js	t
30	JavaScript (nodejs 7.10.1)	\N	/usr/local/node-7.10.1/bin/node main.js	main.js	t
31	OCaml (4.05.0)	/usr/local/ocaml-4.05.0/bin/ocamlc %s main.ml	./a.out	main.ml	t
32	Octave (4.2.0)	\N	/usr/local/octave-4.2.0/bin/octave-cli -q --no-gui --no-history file.m	file.m	t
33	Pascal (fpc 3.0.0)	/usr/local/fpc-3.0.0/bin/fpc %s main.pas	./main	main.pas	t
34	Python (3.6.0)	\N	/usr/local/python-3.6.0/bin/python3 main.py	main.py	t
35	Python (3.5.3)	\N	/usr/local/python-3.5.3/bin/python3 main.py	main.py	t
36	Python (2.7.9)	\N	/usr/local/python-2.7.9/bin/python main.py	main.py	t
37	Python (2.6.9)	\N	/usr/local/python-2.6.9/bin/python main.py	main.py	t
38	Ruby (2.4.0)	\N	/usr/local/ruby-2.4.0/bin/ruby main.rb	main.rb	t
39	Ruby (2.3.3)	\N	/usr/local/ruby-2.3.3/bin/ruby main.rb	main.rb	t
40	Ruby (2.2.6)	\N	/usr/local/ruby-2.2.6/bin/ruby main.rb	main.rb	t
41	Ruby (2.1.9)	\N	/usr/local/ruby-2.1.9/bin/ruby main.rb	main.rb	t
42	Rust (1.20.0)	/usr/local/rust-1.20.0/bin/rustc %s main.rs	./main	main.rs	t
43	Plain Text	\N	/bin/cat text.txt	text.txt	f
44	Executable	\N	/bin/chmod +x a.out && ./a.out	a.out	f
45	Assembly (NASM 2.14.02)	/usr/local/nasm-2.14.02/bin/nasmld -f elf64 %s main.asm	./a.out	main.asm	f
46	Bash (5.0.0)	\N	/usr/local/bash-5.0/bin/bash script.sh	script.sh	f
47	Basic (FBC 1.07.1)	/usr/local/fbc-1.07.1/bin/fbc %s main.bas	./main	main.bas	f
48	C (GCC 7.4.0)	/usr/local/gcc-7.4.0/bin/gcc %s main.c	./a.out	main.c	f
49	C (GCC 8.3.0)	/usr/local/gcc-8.3.0/bin/gcc %s main.c	./a.out	main.c	f
50	C (GCC 9.2.0)	/usr/local/gcc-9.2.0/bin/gcc %s main.c	./a.out	main.c	f
51	C# (Mono 6.6.0.161)	/usr/local/mono-6.6.0.161/bin/mcs %s Main.cs	/usr/local/mono-6.6.0.161/bin/mono Main.exe	Main.cs	f
52	C++ (GCC 7.4.0)	/usr/local/gcc-7.4.0/bin/g++ %s main.cpp	LD_LIBRARY_PATH=/usr/local/gcc-7.4.0/lib64 ./a.out	main.cpp	f
53	C++ (GCC 8.3.0)	/usr/local/gcc-8.3.0/bin/g++ %s main.cpp	LD_LIBRARY_PATH=/usr/local/gcc-8.3.0/lib64 ./a.out	main.cpp	f
54	C++ (GCC 9.2.0)	/usr/local/gcc-9.2.0/bin/g++ %s main.cpp	LD_LIBRARY_PATH=/usr/local/gcc-9.2.0/lib64 ./a.out	main.cpp	f
55	Common Lisp (SBCL 2.0.0)	\N	SBCL_HOME=/usr/local/sbcl-2.0.0/lib/sbcl /usr/local/sbcl-2.0.0/bin/sbcl --script script.lisp	script.lisp	f
56	D (DMD 2.089.1)	/usr/local/d-2.089.1/linux/bin64/dmd %s main.d	./main	main.d	f
57	Elixir (1.9.4)	\N	/usr/local/elixir-1.9.4/bin/elixir script.exs	script.exs	f
58	Erlang (OTP 22.2)	\N	/bin/sed -i '1s/^/\\n/' main.erl && /usr/local/erlang-22.2/bin/escript main.erl	main.erl	f
59	Fortran (GFortran 9.2.0)	/usr/local/gcc-9.2.0/bin/gfortran %s main.f90	LD_LIBRARY_PATH=/usr/local/gcc-9.2.0/lib64 ./a.out	main.f90	f
60	Go (1.13.5)	GOCACHE=/tmp/.cache/go-build /usr/local/go-1.13.5/bin/go build %s main.go	./main	main.go	f
61	Haskell (GHC 8.8.1)	/usr/local/ghc-8.8.1/bin/ghc %s main.hs	./main	main.hs	f
62	Java (OpenJDK 13.0.1)	/usr/local/openjdk13/bin/javac %s Main.java	/usr/local/openjdk13/bin/java Main	Main.java	f
63	JavaScript (Node.js 12.14.0)	\N	/usr/local/node-12.14.0/bin/node script.js	script.js	f
64	Lua (5.3.5)	/usr/local/lua-5.3.5/luac53 %s script.lua	/usr/local/lua-5.3.5/lua53 ./luac.out	script.lua	f
65	OCaml (4.09.0)	/usr/local/ocaml-4.09.0/bin/ocamlc %s main.ml	./a.out	main.ml	f
66	Octave (5.1.0)	\N	/usr/local/octave-5.1.0/bin/octave-cli -q --no-gui --no-history script.m	script.m	f
67	Pascal (FPC 3.0.4)	/usr/local/fpc-3.0.4/bin/fpc %s main.pas	./main	main.pas	f
68	PHP (7.4.1)	\N	/usr/local/php-7.4.1/bin/php script.php	script.php	f
69	Prolog (GNU Prolog 1.4.5)	PATH="/usr/local/gprolog-1.4.5/gprolog-1.4.5/bin:$PATH" /usr/local/gprolog-1.4.5/gprolog-1.4.5/bin/gplc --no-top-level %s main.pro	./main	main.pro	f
70	Python (2.7.17)	\N	/usr/local/python-2.7.17/bin/python2 script.py	script.py	f
71	Python (3.8.1)	\N	/usr/local/python-3.8.1/bin/python3 script.py	script.py	f
72	Ruby (2.7.0)	\N	/usr/local/ruby-2.7.0/bin/ruby script.rb	script.rb	f
73	Rust (1.40.0)	/usr/local/rust-1.40.0/bin/rustc %s main.rs	./main	main.rs	f
74	TypeScript (3.7.4)	/usr/bin/tsc %s script.ts	/usr/local/node-12.14.0/bin/node script.js	script.ts	f
75	C (Clang 7.0.1)	/usr/bin/clang-7 %s main.c	./a.out	main.c	f
76	C++ (Clang 7.0.1)	/usr/bin/clang++-7 %s main.cpp	./a.out	main.cpp	f
77	COBOL (GnuCOBOL 2.2)	/usr/local/gnucobol-2.2/bin/cobc -free -x %s main.cob	LD_LIBRARY_PATH=/usr/local/gnucobol-2.2/lib ./main	main.cob	f
78	Kotlin (1.3.70)	/usr/local/kotlin-1.3.70/bin/kotlinc %s Main.kt	/usr/local/kotlin-1.3.70/bin/kotlin MainKt	Main.kt	f
79	Objective-C (Clang 7.0.1)	/usr/bin/clang-7 `gnustep-config --objc-flags | sed 's/-W[^ ]* //g'` `gnustep-config --base-libs | sed 's/-shared-libgcc//'` -I/usr/lib/gcc/x86_64-linux-gnu/8/include main.m %s	./a.out	main.m	f
80	R (4.0.0)	\N	/usr/local/r-4.0.0/bin/Rscript script.r	script.r	f
81	Scala (2.13.2)	/usr/local/scala-2.13.2/bin/scalac %s Main.scala	/usr/local/scala-2.13.2/bin/scala Main	Main.scala	f
82	SQL (SQLite 3.27.2)	\N	/bin/cat script.sql | /usr/bin/sqlite3 db.sqlite	script.sql	f
83	Swift (5.2.3)	/usr/local/swift-5.2.3/bin/swiftc %s Main.swift	./Main	Main.swift	f
84	Visual Basic.Net (vbnc 0.0.0.5943)	/usr/bin/vbnc %s Main.vb	/usr/bin/mono Main.exe	Main.vb	f
85	Perl (5.28.1)	\N	/usr/bin/perl script.pl	script.pl	f
86	Clojure (1.10.1)	\N	/usr/local/bin/java -jar /usr/local/clojure-1.10.1/clojure.jar main.clj	main.clj	f
87	F# (.NET Core SDK 3.1.202)	\N	mkdir -p ~/.dotnet && touch ~/.dotnet/3.1.202.dotnetFirstUseSentinel && /usr/local/dotnet-sdk/dotnet fsi script.fsx	script.fsx	f
88	Groovy (3.0.3)	/usr/local/groovy-3.0.3/bin/groovyc %s script.groovy	/usr/local/bin/java -cp ".:/usr/local/groovy-3.0.3/lib/*" script	script.groovy	f
89	Multi-file program	\N	\N	\N	f
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: judge0
--

COPY public.schema_migrations (version) FROM stdin;
20160903140859
20160903211542
20160905015919
20160905030833
20160907052244
20170131231840
20170131233631
20170201000546
20170203021217
20170203023903
20170203215830
20170422122148
20170919210318
20170919215014
20170928174721
20170929175654
20190921115544
20190921193416
20191230001624
20200113231131
20200114220437
20200115205044
20200327224155
20210308152656
\.


--
-- Data for Name: submissions; Type: TABLE DATA; Schema: public; Owner: judge0
--

COPY public.submissions (id, source_code, language_id, stdin, expected_output, stdout, status_id, created_at, finished_at, "time", memory, stderr, token, number_of_runs, cpu_time_limit, cpu_extra_time, wall_time_limit, memory_limit, stack_limit, max_processes_and_or_threads, enable_per_process_and_thread_time_limit, enable_per_process_and_thread_memory_limit, max_file_size, compile_output, exit_code, exit_signal, message, wall_time, compiler_options, command_line_arguments, redirect_stderr_to_stdout, callback_url, additional_files, enable_network) FROM stdin;
\.


--
-- Name: languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: judge0
--

SELECT pg_catalog.setval('public.languages_id_seq', 1, false);


--
-- Name: submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: judge0
--

SELECT pg_catalog.setval('public.submissions_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

