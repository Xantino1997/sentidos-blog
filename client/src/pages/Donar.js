import React, { useState } from 'react';

function Donar() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const cbuNumber = '1910516755051600064228'; // Ejemplo de número de CBU
        navigator.clipboard.writeText(cbuNumber)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 3000); // Desaparecer después de 3 segundos
            })
            .catch((error) => {
                console.error('Error al copiar al portapapeles:', error);
            });
    };

    const handleScrollToFooter = () => {
        const footer = document.getElementById('footer');
        footer.scrollIntoView({ behavior: 'smooth' });
    };

    const handleWhatsAppMessage = (number) => {
        const message = encodeURIComponent('Hola quisiera más información sobre cómo donar a Sentidos');
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobileDevice) {
            window.open(`https://api.whatsapp.com/send?phone=${number}&text=${message}`, '_blank');
        } else {
            window.open(`https://web.whatsapp.com/send?phone=${number}&text=${message}`, '_blank');
        }
    };

    return (
        <div className='donar-container'>
            <h1>Bienvenidos a donar</h1>
            <h2 className='donar-title-click' onClick={handleScrollToFooter}>Por qué es importante donar para Sentidos - Chicos con fisura labio alvéolo palatina</h2>
            <div className='donar-datos-sentidos'>
                <span>Denominación: ASOCIACION CIVIL SENTIDOS</span>
                <span>Tipo de cta: CTA CTE Entidades C Social</span>
                <span>Sucursal o filial: 516</span>
                <span>Nº de cta: 642/2</span>
            </div>
            <div className='donar-cbu'>
                <span>CBU:</span>
                <span>1910516755051600064228</span> {/* Aquí deberías mostrar el CBU real */}
            </div>
            <div className='donar-contactos'>
                <span>Teléfonos:</span>
                <span className='donar-nombres' onClick={() => handleWhatsAppMessage('5493413353744')}>
                    <img className='donar-img-whatsapp' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXWfL-XR-8PfzsyllwO7knLNZgUCRJbCvNAw&usqp=CAU' alt='WhatsApp' />
                    Patricia: +54 9 341 335-3744
                </span>
                <span className='donar-nombres' onClick={() => handleWhatsAppMessage('549987654321')}>
                    <img className='donar-img-whatsapp' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXWfL-XR-8PfzsyllwO7knLNZgUCRJbCvNAw&usqp=CAU' alt='WhatsApp' />
                    Berenice: +54 9 876 543-21
                </span>
                <span className='donar-nombres' onClick={() => handleWhatsAppMessage('5493462529718')}>
                    <img className='donar-img-whatsapp' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXWfL-XR-8PfzsyllwO7knLNZgUCRJbCvNAw&usqp=CAU' alt='WhatsApp' />
                    Nombre 3: +54 9 346 252-9718
                </span>
            </div>
            <button className='donar-btn' onClick={handleCopy}>Copiar CBU</button>
            {copied && <p className='donar-copied show'>¡Copiado al portapapeles!</p>}

            <div id='footer' className='donar-footer'>
                <h1>Para Sentidos, tu ayuda es importante</h1>
                <p>
                    La organización Sentidos se dedica a brindar apoyo y atención a los niños con fisura labio alvéolo palatina.
                    Esta condición congénita puede afectar la capacidad de los niños para hablar, comer y socializar de manera efectiva.
                    Tu donación puede marcar la diferencia en la vida de estos niños, proporcionando los recursos y tratamientos necesarios
                    para mejorar su calidad de vida y promover su desarrollo integral.
                </p>
                <p>
                    Al donar a Sentidos, estás contribuyendo directamente a la realización de cirugías reconstructivas, terapias de habla y
                    lenguaje, atención médica especializada y programas de apoyo emocional para los niños y sus familias. Tu generosidad
                    ayuda a crear un entorno inclusivo y brinda oportunidades para que los niños con fisura labio alvéolo palatina alcancen
                    todo su potencial.
                </p>
                <p>
                    Cada donación cuenta y es valorada. Con tu apoyo, podemos continuar brindando esperanza y oportunidades a estos niños
                    que enfrentan desafíos únicos. Únete a nosotros en esta noble causa y juntos hagamos la diferencia en la vida de los
                    niños con fisura labio alvéolo palatina.
                </p>
                <p>
                    ¡Gracias por tu solidaridad y por ser parte del cambio positivo en la vida de estos niños y sus familias!
                </p>
            </div>
        </div>
    );
}

export default Donar;
