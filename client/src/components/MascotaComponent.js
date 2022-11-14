const MascotaComponent = ({mascota}) => {
    const {nombre, tipo, descripcion} = mascota

    return(
        <div>
             <h1>hola</h1>
            <h1>{nombre}</h1>
            <h3>{tipo}</h3>
            <h3>{descripcion}</h3>
        </div>
    )
}

export default MascotaComponent;