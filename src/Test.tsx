import React, {useState, useRef, useEffect} from 'react'

interface IProps {
  data: any,
}

const DragNDrop: React.FC<IProps> = ({data}) => {

    const [list, setList] = useState<any>(data); 
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        setList(data);
    }, [setList, data])

    const dragItem = useRef<any>();
    const dragItemNode = useRef<any>();
    
    const handletDragStart = (e: any, item: any) => {
      // console.log('Starting to drag', item)

      dragItemNode.current = e.target;
      dragItemNode.current.addEventListener('dragend', handleDragEnd)
      dragItem.current = item;

      setTimeout(() => {
          setDragging(true); 
      },0)      
    }
    const handleDragEnter = (e: any, targetItem: any) => {
        // console.log('Entering a drag target', targetItem)
        if (dragItemNode.current !== e.target) {
            // console.log('Target is NOT the same as dragged item')
            setList((oldList: any)=> {
                const newList: any = JSON.parse(JSON.stringify(oldList))
                newList[targetItem.grpI].items.splice(targetItem.itemI, 0, newList[dragItem.current.grpI].items.splice(dragItem.current.itemI,1)[0])
                console.log(dragItem.current, targetItem);
                dragItem.current = targetItem;
                localStorage.setItem('List', JSON.stringify(newList));
                return newList
            })
        }
    }
    const handleDragEnd = (e: any) => {
        setDragging(false);
        dragItem.current = null;
        dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null;
    }
    const getStyles = (item: any) => {
        if (dragItem.current.grpI === item.grpI && dragItem.current.itemI === item.itemI) {
            return "dnd-item current"
        }
        return "dnd-item"
    }

    if (list) {
        return (                
            <div className="drag-n-drop">
            {list.map((grp: any, grpI: any) => (
              <div key={grp.title} onDragEnter={(dragging && !grp.items.length?(e: any) => handleDragEnter(e,{grpI, itemI: 0}):null) as any} className="dnd-group">
                {grp.items.map((item: any, itemI: any) => (
                  <div draggable key={item}  onDragStart={(e) => handletDragStart(e, {grpI, itemI})} onDragEnter={(dragging?(e: any) => {handleDragEnter(e, {grpI, itemI})}:null) as any} className={dragging?getStyles({grpI, itemI}):"dnd-item"}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
            </div>
        )
    } else { return null}

}

export default DragNDrop;