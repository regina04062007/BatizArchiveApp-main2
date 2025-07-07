const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conexion = require('./db'); 

const app = express();
const router = express.Router();
const PORT = 5000;
const JWT_SECRET = 'n0m3l0';


const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ error: 'No se proporcionó un token válido' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.usuarioId = decoded.id;
    next();
  });
};



app.use(cors());
app.use(bodyParser.json());
app.use('/api', router); 



app.post('/api/register', async (req, res) => {
  const { nom_usuario, appat_usuario, apmat_usuario, contrasena_usuario, correo_usuario, id_genero } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena_usuario, saltRounds);

    const query = `
      INSERT INTO musuario 
      (nom_usuario, appat_usuario, apmat_usuario, contrasena_usuario, correo_usuario, id_genero, id_catUsuario) 
      VALUES (?, ?, ?, ?, ?, ?, 1)`;

    conexion.query(
      query,
      [nom_usuario, appat_usuario, apmat_usuario, hashedPassword, correo_usuario, id_genero],
      (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Error en la base de datos');
        } else {
          res.status(200).send('Usuario registrado con éxito');
        }
      }
    );

  } catch (error) {
    console.error('Error al generar el hash de la contraseña:', error);
    res.status(500).send('Error al procesar la contraseña');
  }
});


//Inicio de sesión
app.post('/api/login', async (req, res) => {
    const { correo_usuario, contrasena_usuario } = req.body;
    
    if (!correo_usuario || !contrasena_usuario) {
      return res.status(400).json({ error: 'Ingrese correo y contraseña' });
    }
  
    const query = 'SELECT * FROM musuario WHERE correo_usuario = ?';
    
    conexion.query(query, [correo_usuario], async (error, results) => {
      if (error) {
        console.error('Error en la consulta SQL:', error);
        return res.status(500).send('Error en el servidor');
      }
    
      if (results.length > 0) {
        const usuario = results[0];
        console.log('Usuario encontrado:', usuario);
    
        const isMatch = await bcrypt.compare(contrasena_usuario, usuario.contrasena_usuario);
        console.log('¿Contraseña coincide?', isMatch);
    
        if (isMatch) {
          const token = jwt.sign({ id: usuario.id_usuario }, JWT_SECRET, { expiresIn: '1h' });
          return res.json({ token });
        } else {
          return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
      } else {
        return res.status(401).json({ error: 'Correo electrónico no encontrado' });
      }
    });
    
});

//información del usuario
router.get('/perfil', verificarToken, (req, res) => {
  const usuarioId = req.usuarioId;

  const query = 'SELECT nom_usuario, appat_usuario, apmat_usuario, correo_usuario FROM musuario WHERE id_usuario = ?';

  conexion.query(query, [usuarioId], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).send('Error en el servidor');
    }

    if (results.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    res.json(results[0]); 
  });
});

//proyectos del usuario 
router.get('/proyectos/mios', verificarToken, (req, res) => {
  const usuarioId = req.usuarioId;

  const query = `
    SELECT 
      p.id_proyecto,
      m.titulo_p
    FROM proyecto p
    JOIN mportadap m ON p.id_portadaP = m.id_portadaP
    WHERE p.id_usuario = ?
  `;

  conexion.query(query, [usuarioId], (err, results) => {
    if (err) {
      console.error('Error al obtener proyectos del usuario:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    res.json(results);
  });
});

// proyectos favoritos del usuario
router.get('/proyectos/favoritos', verificarToken, (req, res) => {
  const usuarioId = req.usuarioId;

  const query = `
    SELECT 
      p.id_proyecto,
      m.titulo_p
    FROM favoritos f
    JOIN proyecto p ON f.id_proyecto = p.id_proyecto
    JOIN mportadap m ON p.id_portadaP = m.id_portadaP
    WHERE f.id_usuario = ?
  `;

  conexion.query(query, [usuarioId], (err, results) => {
    if (err) {
      console.error('Error al obtener favoritos:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    res.json(results);
  });
});

//proyectos
router.get('/proyectos/todos', (req, res) => {
  const query = `
    SELECT 
      p.id_proyecto,
      m.titulo_p,
      e.desc_especialidad,
      g.desc_grupo,
      i.URL_textoD
    FROM proyecto p
    INNER JOIN mportadap m ON p.id_portadaP = m.id_portadaP
    INNER JOIN cespecialidad e ON p.id_especialidad = e.id_especialidad
    INNER JOIN cgrupo g ON p.id_grupo = g.id_grupo
    INNER JOIN imgd i ON p.id_imgD = i.id_imgD
    ORDER BY p.fechac_p DESC
  `;

  conexion.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener proyectos:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    res.json(results);
  });
});


// proyectos por especialidad 
router.post('/proyectos/:especialidad',verificarToken, async (req, res) => {
  const especialidad = req.params.especialidad;
  
  const query = `
    SELECT 
        proyecto.id_proyecto,
        proyecto.id_codProyecto,
        proyecto.calificacion,
        proyecto.fechac_p,
        mportadap.titulo_p AS titulo_p,
        cespecialidad.desc_especialidad AS desc_especialidad,
        cgrupo.desc_grupo AS grupo,
        imgd.URL_textoD AS img_url
    FROM 
        proyecto
    JOIN 
        mportadap ON proyecto.id_portadaP = mportadap.id_portadaP
    JOIN 
        cespecialidad ON proyecto.id_especialidad = cespecialidad.id_especialidad
    JOIN 
        cgrupo ON proyecto.id_grupo = cgrupo.id_grupo
    LEFT JOIN 
        imgd ON proyecto.id_imgD = imgd.id_imgD
    LEFT JOIN 
        textod ON textod.id_proyecto = proyecto.id_proyecto
    WHERE 
        cespecialidad.desc_especialidad = ?;
  `;

  try {
    const [results] = await conexion.promise().query(query, [especialidad]);
    res.send(results);
  } catch (error) {
    console.error('Error al consultar la base de datos', error);
    res.status(500).send('Error al consultar la base de datos');
  }
});



























// ver proyecto
router.get('/verProyectos/:id', async (req, res) => {
  const id_proyecto = req.params.id;
  console.log(' Buscando proyecto con ID:', id_proyecto);

  const query = `
    SELECT 
      proyecto.id_proyecto,
      proyecto.id_codProyecto,
      proyecto.fechac_p,
      mportadap.titulo_p AS titulo_p,
      DATE_FORMAT(COALESCE(proyecto.fechac_p, NOW()), '%Y-%m-%d %H:%i:%s') AS fecha_creacion,
      DATE_FORMAT(COALESCE(mportadap.fecha_modificacionP, NOW()), '%Y-%m-%d %H:%i:%s') AS ultima_actualizacion,
      cespecialidad.desc_especialidad AS desc_especialidad,
      cgrupo.desc_grupo AS grupo,
      mportadap.obj_p,
      mportadap.ejeT_p,
      mportadap.justificacion_p,
      mportadap.impacto_socialp,
      mportadap.proposito_p,
      imgd.URL_textoD AS img_url,
      textod.desc_textoD AS descripcion_documento,
      textod.fecha_publicacionD AS fecha_documento
    FROM 
      proyecto
    LEFT JOIN 
      mportadap ON proyecto.id_portadaP = mportadap.id_portadaP
    LEFT JOIN 
      cespecialidad ON proyecto.id_especialidad = cespecialidad.id_especialidad
    LEFT JOIN 
      cgrupo ON proyecto.id_grupo = cgrupo.id_grupo
    LEFT JOIN 
      imgd ON proyecto.id_imgD = imgd.id_imgD
    LEFT JOIN 
      textod ON textod.id_proyecto = proyecto.id_proyecto
    WHERE 
      proyecto.id_proyecto = ?;
  `;

  const query2 = `
        SELECT 
	        textod.doc_textoD AS texto_url,
	        textod.desc_textoD,
	 	textod.id_textoD
	        FROM textod
        WHERE textod.id_proyecto = ?;
    `;

    const query3 = `
        SELECT 
	        dimagendoc.doc_imgdoc,
	        dimagendoc.nombre_imgdoc,
	        dimagendoc.id_imgdoc
	        FROM dimagendoc
        WHERE dimagendoc.id_proyecto = ?;
    `;

  try {
    const [rows] = await conexion.promise().query(query, [id_proyecto]);
    const [imagenes] = await conexion.promise().query(query3, [id_proyecto]);
    const [documentos] = await conexion.promise().query(query2, [id_proyecto]);
    console.log(' Resultados del query:', rows);
    console.log("Imágenes del proyecto:", imagenes);
    console.log("Documentos del proyecto: ", documentos);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    const proyecto = rows[0];

    // Agrega los documentos y las imágenes al objeto del proyecto
    proyecto.documentacion_pdf = documentos.map(doc => ({
      nombre: doc.desc_textoD,
      enlace: `http://192.168.1.66:5000/api/documento/${doc.id_textoD}`
    }));

    proyecto.documentacion_imagenes = imagenes.map(img => ({
      nombre: img.nombre_imgdoc,
      enlace: `http://192.168.1.66:5000/api/imagen/${img.id_imgdoc}`
    }));

    res.json(proyecto);

  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      error: 'Error al consultar la base de datos',
      detalle: error.message,
      stack: error.stack 
    });
  }
});

router.get('/documento/:id', async (req, res) => {
    const { id } = req.params;
    
    const query = `SELECT doc_textoD, desc_textoD FROM textod WHERE id_textoD = ?`;

    try {
        const [results] = await conexion.promise().query(query, [id]);

        if (results.length > 0) {
            const documento = results[0];

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${documento.desc_textoD}"`);
            res.send(documento.doc_textoD);
        } else {
            res.status(404).send('Documento no encontrado');
        }
    } catch (error) {
        console.error('Error al obtener el documento:', error);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/imagen/:id', async (req, res) => {
    const { id } = req.params;

    const query = `SELECT doc_imgdoc, nombre_imgdoc FROM dimagendoc WHERE id_imgdoc = ?`;

    try {
        const [results] = await conexion.promise().query(query, [id]);

        if (results.length > 0) {
            const imagen = results[0];

            res.setHeader('Content-Type', 'image/jpeg');
            res.send(imagen.doc_imgdoc);
        } else {
            res.status(404).send('Imagen no encontrada');
        }
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        res.status(500).send('Error en el servidor');
    }
});


































// Buscador en tiempo real
router.get('/buscador/real-time', async (req, res) => {
  const query = req.query.query?.trim();

  if (!query || query.length === 0) {
    return res.json([]);
  }

  const sql = `
    SELECT 
      p.id_proyecto,
      m.titulo_p,
      e.desc_especialidad,
      g.desc_grupo,
      i.URL_textoD
    FROM proyecto p
    JOIN mportadap m ON p.id_portadaP = m.id_portadaP
    JOIN cespecialidad e ON p.id_especialidad = e.id_especialidad
    JOIN cgrupo g ON p.id_grupo = g.id_grupo
    LEFT JOIN imgd i ON p.id_imgD = i.id_imgD
    WHERE m.titulo_p LIKE ? COLLATE utf8mb4_unicode_ci
    LIMIT 7;
  `;

  try {
    const [results] = await conexion.promise().query(sql, [`%${query}%`]);
    res.json(results);
  } catch (error) {
    console.error('Error en búsqueda:', error);
    res.status(500).json({ message: 'Error en la búsqueda en base de datos.' });
  }
});








app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});