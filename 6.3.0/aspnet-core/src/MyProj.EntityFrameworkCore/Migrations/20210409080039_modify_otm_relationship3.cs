using Microsoft.EntityFrameworkCore.Migrations;

namespace MyProj.Migrations
{
    public partial class modify_otm_relationship3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TinhEntityId",
                table: "Tinh");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TinhEntityId",
                table: "Tinh",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
