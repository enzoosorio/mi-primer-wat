import React, { useState } from "react";

export const BancoPreguntas = () => {

    const [form, setForm] = useState({
        usuario: "",
        tipoPregunta: "publico",
        pregunta: "",
      });
      const [errors, setErrors] = useState<{ usuario?: string; pregunta?: string }>({});
      const [isFormActive, setIsFormActive] = useState(false);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { usuario?: string; pregunta?: string } = {};
    
        if (!form.usuario.trim()) newErrors.usuario = "El nombre es obligatorio";
        if (!form.pregunta.trim()) newErrors.pregunta = "La pregunta no puede estar vacía";
    
        
        const regexUsername = /^[a-zA-Z]+$/;
        if (!regexUsername.test(form.usuario)) newErrors.usuario = "El nombre solo puede contener letras";

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
    
        console.log("Formulario enviado:", form);
        setErrors({});
      };

  return (
    <div className={`flex flex-col items-center justify-center ${isFormActive ? "gap-12" : "gap-8"} w-full bg-gray-200/75 rounded-xl p-5 shadow-xl`}>
        <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-3xl font-bold font-nunito mt-6 text-center">Banco de Preguntas</h1>
        {/* <p className="text-base font-nunito">Anímate a dejar tu pregunta</p> */}
        </div>
        {isFormActive ? (
            <form onSubmit={handleSubmit} id="form-preguntas" className="flex flex-col items-center justify-center gap-8 w-full">
            <div className="w-full flex flex-col items-start justify-start gap-4">
                <label htmlFor="nombre" className="text-lg font-roboto text-right">Tu nombre</label>
                <input id="nombre" onChange={(e) => handleChange(e)} type="text" name="usuario" className="w-full rounded-lg px-2 py-4 font-roboto text-black bg-white/75 outline-none shadow-sm max-w-[400px] " placeholder="Escribe tu pregunta aquí..." />
                {errors.usuario && <p className="text-red-500 text-sm">{errors.usuario}</p>}
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-4">
                <label htmlFor="tipoPregunta" className="text-lg font-roboto text-right">¿Respuesta pública o privada?</label>
                <select id="tipoPregunta" name="tipoPregunta" onChange={(e) => handleChange(e)} className="w-full rounded-lg px-2 py-4 font-roboto text-black bg-white/75 outline-none shadow-sm max-w-[400px] ">
                    <option value="publico">Público</option>
                    <option value="privado">Privado</option>
                </select>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-4">
                <label htmlFor="pregunta" className="text-lg font-roboto text-right">Tu pregunta</label>
                <textarea id="pregunta" name="pregunta" onChange={(e) => handleChange(e)} className="w-full rounded-lg p-2  font-roboto text-black bg-white/75 outline-none shadow-sm  resize-none min-h-[150px]" placeholder="Escribe tu pregunta aquí..." />
                {errors.pregunta && <p className="text-red-500 text-sm">{errors.pregunta}</p>}
            </div>
            <div className="flex flex-row items-center justify-center gap-8 w-full">
                <button onClick={() => setIsFormActive(false)} type="button" className="submitButton w-full text-lg font-nunito rounded-lg px-2 py-4 cursor-pointer text-black bg-white outline-none shadow-sm max-w-[400px] transition-all duration-300 ease-in-out hover:font-bold">Cerrar</button>
                <button type="submit" className="submitButton w-full text-lg font-nunito rounded-lg px-2 py-4 cursor-pointer text-black bg-yellow/75 outline-none shadow-sm max-w-[400px] transition-all duration-300 ease-in-out hover:font-bold">Preguntar</button>
            </div>
        </form>
        ) : (
            <div className="flex flex-col items-center justify-center w-full gap-8 mx-auto px-2">
            <p className="text-xl text-center font-delicious-small-caps w-[70%]">¡Pregunta haciendo click en el botón!</p>
            <button 
            onClick={() => setIsFormActive(true)}
            type="button" className=" w-full text-lg font-nunito rounded-lg px-2 py-4 cursor-pointer text-black bg-yellow outline-none shadow-sm max-w-[400px] transition-all duration-300 ease-in-out hover:font-bold">Preguntar</button>
        </div>
        )}
        
</div>
  );
};
