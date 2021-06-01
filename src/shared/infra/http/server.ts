import 'module-alias/register';

import app from './config/app';

app.listen(process.env.PORT || 3333, () =>
  console.log(`🚧 Server running at http://localhost:${process.env.PORT} 🚧\n`),
);
