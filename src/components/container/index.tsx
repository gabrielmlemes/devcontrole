interface ContainerProps {
    children: React.ReactNode;
}

const Container = ({children}:ContainerProps) => {
    return ( 
        <div className="w-full max-w-7xl mx-auto px-2">
            {children}
        </div>
     );
}
 
export default Container;