# Core Package

Web ve ileride React Native tarafinin ortak kullanacagi clean architecture kodu burada durur.

- `src/features/*/domain`: Entity, value object, event ve repository contractlari.
- `src/features/*/application`: Use case, query ve orchestration kodlari.
- `src/features/*/infrastructure`: Contract implementationlari ve dis dunya adapterleri.
- `src/features/*/presentation`: Platformlarin paylasabilecegi presentation model/controller kodlari.
- `src/shared`: Feature bagimsiz architecture, event ve HTTP abstractionlari.

