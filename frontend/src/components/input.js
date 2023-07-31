export default function Input({show=true,eman='',placeholder='',classes,type="text",onChange=''})
{
if(show)
return(
    <input className={classes} onChange={onChange} type={type} />
)
}