import { Drawer } from 'antd';
import { useState } from 'react';

const CustomBottomDrawer = ({onClose, visible}) => {
   

   return (
      <>
         <Drawer
            title='Custom Bottom Drawer'
            placement='bottom'
            closable={false}
            onClose={onClose}
            visible={visible}
         >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae deserunt nihil accusantium! Repellat sed, voluptates nemo a reprehenderit, eaque earum laborum natus omnis aperiam iure iste dolores officiis! Aspernatur iusto facilis dolores illum corrupti eligendi dolorum, fugit nam quaerat facere quasi maiores quos dolorem quia totam a magni amet voluptate recusandae placeat minus! Repellendus rem fuga dignissimos nemo culpa nobis beatae! Repellat necessitatibus ipsa consequuntur doloremque voluptatum minus eaque, neque distinctio, autem perferendis praesentium? Ipsa pariatur repellendus ipsam dolorum alias omnis, voluptatem, perspiciatis nobis debitis in explicabo possimus ab deserunt ut temporibus ex mollitia? Culpa nihil minima cupiditate nemo. Cumque sunt, velit autem vero totam veniam odit distinctio placeat laborum, inventore omnis quia? Nihil delectus accusantium nisi consectetur saepe est temporibus. Exercitationem sed nulla cumque vel laboriosam autem ea vitae iure ullam maxime. Soluta numquam doloribus repudiandae eaque quibusdam laboriosam similique, ratione, ipsum a beatae ab corporis error exercitationem nisi quia at harum corrupti consequatur porro recusandae architecto voluptas. Laborum libero quo, totam illo commodi ut cumque soluta, provident sequi delectus eveniet odio alias placeat! Nesciunt debitis porro quisquam quaerat repellat voluptatibus corporis natus ullam assumenda, quas ab laborum, aliquid dolore tempora libero. Rem temporibus facere dolore? Nisi cupiditate odio similique quos, tenetur temporibus, veniam architecto eveniet laboriosam est rem ea culpa optio sapiente placeat non veritatis explicabo autem molestiae harum quia. Repellat, minus cupiditate reprehenderit beatae, enim ea quis, quasi eligendi officia quaerat amet sint! Asperiores assumenda dignissimos, ex fuga praesentium eligendi quibusdam! Corporis mollitia explicabo non quidem, incidunt distinctio debitis sequi suscipit doloribus, corrupti iusto. Autem molestiae saepe iste reiciendis, amet repellat maxime vitae, delectus quasi minus deleniti perferendis nemo ab distinctio laboriosam magni vel laudantium et quos sit iusto sapiente. Velit, perferendis cum ad perspiciatis voluptatibus animi, cumque veritatis molestias quos voluptatum nemo in at illum laudantium possimus exercitationem asperiores ea, reprehenderit aspernatur quia provident beatae. Mollitia corporis non sint quae, cum velit doloremque esse alias consequatur dolore. Amet, nulla quo architecto in repudiandae corrupti quae? Tenetur cupiditate modi nam sit voluptatibus provident quis eligendi odit, tempora placeat dolorum ex repellat nostrum reprehenderit. Facilis mollitia velit expedita optio, tempora dolore consectetur vel nisi et itaque. Quo architecto veritatis nostrum temporibus sint, ex enim voluptatem necessitatibus i</p>
         </Drawer>
      </>
   );
};

export default CustomBottomDrawer;
